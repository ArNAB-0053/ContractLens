import re
from typing import List, Dict
from TextPreprocessing import TextExtractor, TextCleaner
import joblib
from typing import List, Dict

class ParagraphExtractor:
    """
    A class to extract and classify paragraphs from PDF documents.
    """

    def __init__(self, text_extractor: TextExtractor):
        """
        Initialize ParagraphExtractor with a TextExtractor instance.

        Args:
            text_extractor (TextExtractor): Instance of the TextExtractor class.
        """
        self.text_extractor = text_extractor
        self.section_patterns = {
            'main_section': r'^\s*(\d+\.)\s*([A-Z][^.]+)',           # 1. SECTION
            'subsection_letter': r'^\s*\(([a-z])\)\s*',              # (a)
            'subsection_number': r'^\s*(\d+\.\d+)\s*',               # 1.1
            'special_section': r'^(WHEREAS|NOW,\s*THEREFORE|IN\s*WITNESS\s*WHEREOF)',  # Special sections
        }

    def classify_paragraph(self, text: str) -> Dict:
        """
        Classify paragraph type and extract structural information.

        Args:
            text (str): The paragraph text to classify.

        Returns:
            Dict: Classification details including type, level, number, and header.
        """
        text = text.strip()

        # Check for special sections
        for special in ['WHEREAS', 'NOW, THEREFORE', 'IN WITNESS WHEREOF']:
            if text.startswith(special):
                return {'type': 'special_section', 'level': 0, 'number': None, 'header': special}

        # Check for main sections
        main_match = re.match(self.section_patterns['main_section'], text)
        if main_match:
            return {'type': 'main_section', 'level': 0, 'number': main_match.group(1), 'header': main_match.group(2)}

        # Check for lettered subsections
        subsection_match = re.match(self.section_patterns['subsection_letter'], text)
        if subsection_match:
            return {'type': 'subsection', 'level': 1, 'number': f"({subsection_match.group(1)})", 'header': None}

        # Check for numbered subsections
        numbered_match = re.match(self.section_patterns['subsection_number'], text)
        if numbered_match:
            return {'type': 'subsection', 'level': 1, 'number': numbered_match.group(1), 'header': None}

        # Default classification
        return {'type': 'content', 'level': 0, 'number': None, 'header': None}

    def extract_paragraphs(self, pdf_path: str) -> List[Dict]:
        """
        Extract and classify paragraphs from a PDF.

        Args:
            pdf_path (str): Path to the PDF file.

        Returns:
            List[Dict]: A list of paragraphs with classification details.
        """
        text = self.text_extractor.extract_text_from_pdf(pdf_path)  # Extract text using TextExtractor
        raw_paragraphs = re.split(r'\n\s*\n', text)  # Split into paragraphs

        processed_paragraphs = []
        for raw_text in raw_paragraphs:
            if not raw_text.strip():  # Skip empty paragraphs
                continue

            classification = self.classify_paragraph(raw_text)
            paragraph = {
                'text': raw_text.strip(),
                'type': classification['type'],
                'level': classification['level'],
                'number': classification['number'],
                'header': classification['header'],
            }
            processed_paragraphs.append(paragraph)

        return processed_paragraphs


class ParagraphAnnotator:
    def __init__(self, model, vectorizer):
        self.model = model
        self.vectorizer = vectorizer
        self.text_cleaner = TextCleaner()  # Create instance of TextCleaner

    def annotate_paragraphs(self, paragraphs: List[Dict]) -> List[Dict]:
        annotated_paragraphs = []
        
        for idx, paragraph in enumerate(paragraphs):
            predefined_type = paragraph["type"]
            
            # Get ML prediction - use the instance method
            cleaned_paragraph = self.text_cleaner.clean_text(paragraph["text"])
            paragraph_vector = self.vectorizer.transform([cleaned_paragraph])
            ml_predicted_type = self.model.predict(paragraph_vector)[0]
            
            # Add standard annotations
            paragraph["annotation_id"] = idx + 1
            paragraph["is_critical"] = predefined_type in ["main_section", "special_section"]
            
            # Compare and set clause types
            if predefined_type == ml_predicted_type:
                paragraph["clause_types"] = [predefined_type]
            else:
                paragraph["clause_types"] = [ml_predicted_type, predefined_type]
                
            annotated_paragraphs.append(paragraph)
            
        return annotated_paragraphs
