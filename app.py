import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
from nltk.corpus import stopwords
import spacy
import re
from sklearn.metrics.pairwise import cosine_similarity
import difflib

app = Flask(__name__)
CORS(app)

# Load your model and vectorizer
model = joblib.load('ensemble_model.pkl')
vectorizer = joblib.load('ensemble_model_tfidf_vectorizer.pkl')

# Load spaCy model and NLTK resources
nlp = spacy.load("en_core_web_sm")
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text("text")
    return text

# Function to split text into paragraphs
def split_text_into_paragraphs(text):
    paragraphs = re.split(r'\n\d+\.\s\xa0|\n\xa0', text)
    paragraphs = [para.strip() for para in paragraphs if para.strip()]
    return paragraphs

# Function to clean and preprocess text
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text)
    text = " ".join([word for word in text.split() if word not in stop_words])
    doc = nlp(text)
    text = " ".join([token.lemma_ for token in doc])
    return text

# Function to calculate cosine similarity between two texts
def calculate_similarity(text1, text2):
    cleaned_text1 = clean_text(text1)
    cleaned_text2 = clean_text(text2)
    vector1 = vectorizer.transform([cleaned_text1])
    vector2 = vectorizer.transform([cleaned_text2])
    similarity = cosine_similarity(vector1, vector2)[0][0]
    return similarity

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

@app.route('/', methods=['GET','POST'])
def compare_contracts():
    if 'file1' not in request.files or 'file2' not in request.files:
        return jsonify({'error': 'Both PDF files are required'}), 400

    file1 = request.files['file1']
    file2 = request.files['file2']

    file1.save('temp1.pdf')
    file2.save('temp2.pdf')

    text1 = extract_text_from_pdf('temp1.pdf')
    text2 = extract_text_from_pdf('temp2.pdf')

    paragraphs1 = split_text_into_paragraphs(text1)
    paragraphs2 = split_text_into_paragraphs(text2)

    results = []
    unique_in_contract1 = []
    unique_in_contract2 = []
    similarity_threshold = 0.3  # You can adjust this threshold

    matched_paragraphs1 = set()
    matched_paragraphs2 = set()

    for idx2, para2 in enumerate(paragraphs2):
        max_similarity = 0
        max_idx1 = -1
        for idx1, para1 in enumerate(paragraphs1):
            similarity = calculate_similarity(para1, para2)
            if similarity > max_similarity:
                max_similarity = similarity
                max_idx1 = idx1

        if max_similarity > similarity_threshold:
            matched_paragraphs1.add(max_idx1)
            matched_paragraphs2.add(idx2)
            para1_text, para2_text = highlight_mismatches(paragraphs1[max_idx1], para2)
            results.append({
                "paragraph_no_1": max_idx1 + 1,
                "paragraph_text_1": para1_text,
                "paragraph_no_2": idx2 + 1,
                "paragraph_text_2": para2_text,
                "similarity": max_similarity
            })
        else:
            unique_in_contract2.append({
                "paragraph_no": idx2 + 1,
                "paragraph_text": para2
            })

    for idx1, para1 in enumerate(paragraphs1):
        if idx1 not in matched_paragraphs1:
            unique_in_contract1.append({
                "paragraph_no": idx1 + 1,
                "paragraph_text": para1
            })

    return jsonify({
        "results": results,
        "unique_in_contract1": unique_in_contract1,
        "unique_in_contract2": unique_in_contract2
    })