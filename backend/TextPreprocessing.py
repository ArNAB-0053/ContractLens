import fitz  
from PIL import Image
import pytesseract
import os
import re
import spacy
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

class TextExtractor:    
    def __init__(self, tesseract_path: str = None):
        if tesseract_path:
            pytesseract.pytesseract.tesseract_cmd = tesseract_path

    def extract_text_from_pdf(self, pdf_path: str, temp_image_folder: str = "temp_images") -> str:
        # Ensure temporary image directory exists
        if not os.path.exists(temp_image_folder):
            os.makedirs(temp_image_folder)

        doc = fitz.open(pdf_path)
        extracted_text = []

        for i, page in enumerate(doc):
            # Attempt to extract text directly
            page_text = page.get_text()
            if page_text.strip():
                extracted_text.append(page_text)
                continue

            # Fall back to OCR if no text found
            pix = page.get_pixmap(dpi=300)  # Render page to image with high DPI
            image_path = os.path.join(temp_image_folder, f"page_{i + 1}.png")
            pix.save(image_path)  # Save image

            try:
                # Use OCR to extract text from the image
                image = Image.open(image_path)
                text = pytesseract.image_to_string(image)
                extracted_text.append(text)
                image.close()
            finally:
                # Clean up temporary image
                if os.path.exists(image_path):
                    os.remove(image_path)

        # Remove temporary folder if empty
        if os.path.exists(temp_image_folder) and not os.listdir(temp_image_folder):
            os.rmdir(temp_image_folder)

        return "\n".join(extracted_text)


class TextCleaner:    
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.stop_words = set(stopwords.words("english"))
    
    def clean_text(self, text: str) -> str:
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        text = re.sub(r'\s+', ' ', text)
        text = " ".join([word for word in text.split() if word not in self.stop_words])
        doc = self.nlp(text)
        text = " ".join([token.lemma_ for token in doc])
        return text


class TextVectorizer:    
    def __init__(self, vectorizer_model_path: str):
        import joblib
        self.vectorizer = joblib.load(vectorizer_model_path)

    def transform_text(self, text: str):
        return self.vectorizer.transform([text])
