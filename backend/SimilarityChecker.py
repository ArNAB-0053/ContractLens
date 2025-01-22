# SimilarityChecker.py

from sklearn.metrics.pairwise import cosine_similarity
import difflib


class SimilarityCalculator:
    """Class to calculate text similarity using cosine similarity."""
    
    def __init__(self, vectorizer):
        self.vectorizer = vectorizer

    def calculate_similarity(self, text1, text2):
        vector1 = self.vectorizer.transform_text(text1)
        vector2 = self.vectorizer.transform_text(text2)
        return cosine_similarity(vector1, vector2)[0][0]


class MismatchHighlighter:
    """Class to highlight mismatches between two texts."""
    
    def __init__(self):
        pass

    @staticmethod
    def highlight_mismatches(text1, text2):
        words1 = text1.split()
        words2 = text2.split()

        differ = difflib.Differ()
        diff = list(differ.compare(words1, words2))

        highlighted_text1 = ""
        highlighted_text2 = ""
        for word in diff:
            if word.startswith('  '):
                highlighted_text1 += word[2:] + " "
                highlighted_text2 += word[2:] + " "
            elif word.startswith('- '):
                highlighted_text1 += f"<mark>{word[2:]}</mark> "
            elif word.startswith('+ '):
                highlighted_text2 += f"<mark>{word[2:]}</mark> "

        return highlighted_text1.strip(), highlighted_text2.strip()
