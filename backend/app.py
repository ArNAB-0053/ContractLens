from flask import Flask, request, jsonify
from flask_cors import CORS
from TextPreprocessing import TextExtractor, TextCleaner, TextVectorizer
from ParagraphProcessing import ParagraphExtractor, ParagraphAnnotator
from SimilarityChecker import SimilarityCalculator, MismatchHighlighter
import joblib
import os
from werkzeug.utils import secure_filename

# Initialize the Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Create and configure upload folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'temp_uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


print("Loading ML model and vectorizer...")
model = joblib.load('ensemble_model.pkl')
vectorizer = joblib.load('ensemble_model_tfidf_vectorizer.pkl')
print("Successfully loaded ML model and vectorizer")

# Initialize the necessary classes
text_extractor = TextExtractor(tesseract_path='ensemble_model.pkl')
text_cleaner = TextCleaner()
text_vectorizer = TextVectorizer(vectorizer_model_path='ensemble_model_tfidf_vectorizer.pkl')

paragraph_extractor = ParagraphExtractor(text_extractor=text_extractor)
paragraph_annotator = ParagraphAnnotator(model=model, vectorizer=vectorizer)  

similarity_calculator = SimilarityCalculator(vectorizer=text_vectorizer)
mismatch_highlighter = MismatchHighlighter()

@app.route('/api/extract-text', methods=['POST'])
def extract_text():
    if 'file' not in request.files:
        return jsonify({"error": "File is required"}), 400

    file = request.files['file']
    print("File received:", file.filename)

    # Check if the file is empty
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file to a temporary path
    temp_file_path = 'temp_file.pdf'
    file.save(temp_file_path)
    print(f"File saved temporarily to: {temp_file_path}")

    try:
        # Extract text using the `TextExtractor` class
        extracted_text = text_extractor.extract_text_from_pdf(temp_file_path)

        return jsonify({"extracted_text": extracted_text})
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_file_path):
            print(f"Cleaning up temporary file: {temp_file_path}")
            os.remove(temp_file_path)



@app.route('/api/calculate-similarity', methods=['POST'])
def calculate_similarity():
    """Calculate similarity between two texts."""
    data = request.get_json()
    text1 = data.get('text1')
    text2 = data.get('text2')

    if not text1 or not text2:
        return jsonify({"error": "Both text1 and text2 are required"}), 400

    try:
        similarity = similarity_calculator.calculate_similarity(text1, text2)
        return jsonify({"similarity_score": similarity}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/summarize-text', methods=['POST'])
def summarize_text():
    """Summarize the provided text (Placeholder)."""
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({"error": "Text input is required"}), 400

    try:
        # Implement summarization logic or integrate an external tool here
        summarized_text = "Summarization not implemented yet. Placeholder response."
        return jsonify({"summarized_text": summarized_text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/chat-with-pdf', methods=['POST'])
def chat_with_pdf():
    """Chat with a PDF (Placeholder for now)."""
    # Integrate chat logic with PDF text
    return jsonify({"message": "Chat with PDF feature not implemented yet."}), 501


@app.route('/api/annotate-paragraphs', methods=['POST'])
def annotate_paragraphs():
    """Annotate paragraphs with types and details."""
    if 'file' not in request.files:
        return jsonify({"error": "PDF file is required"}), 400

    file = request.files['file']
    pdf_path = 'uploaded_temp.pdf'
    file.save(pdf_path)

    try:
        paragraphs = paragraph_extractor.extract_paragraphs(pdf_path)
        annotated_paragraphs = paragraph_annotator.annotate_paragraphs(paragraphs)
        return jsonify({"annotated_paragraphs": annotated_paragraphs}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['POST'])
def compare_pdfs():
    if 'file1' not in request.files or 'file2' not in request.files:
        return jsonify({"error": "Both PDF files are required"}), 400

    file1 = request.files['file1']
    file2 = request.files['file2']

    pdf_path1 = 'temp1.pdf'
    pdf_path2 = 'temp2.pdf'
    file1.save(pdf_path1)
    file2.save(pdf_path2)

    print("Extracting paragraphs...")
    paragraphs1 = paragraph_extractor.extract_paragraphs(pdf_path1)
    paragraphs2 = paragraph_extractor.extract_paragraphs(pdf_path2)

    print("Annotating paragraphs...")
    annotated_paragraphs1 = paragraph_annotator.annotate_paragraphs(paragraphs1)
    print(f"Sample paragraph 1 after annotation: {annotated_paragraphs1[0] if annotated_paragraphs1 else 'No paragraphs'}")
    
    annotated_paragraphs2 = paragraph_annotator.annotate_paragraphs(paragraphs2)
    print(f"Sample paragraph 2 after annotation: {annotated_paragraphs2[0] if annotated_paragraphs2 else 'No paragraphs'}")

    results = []
    unique_in_doc1 = []
    unique_in_doc2 = []
    similarity_threshold = 0.3

    matched_para1 = set()
    matched_para2 = set()
    

    for idx2, para2 in enumerate(annotated_paragraphs2):
        text2 = para2["text"]
        type2 = para2["type"]
        max_similarity = 0
        max_idx1 = -1

        for idx1, para1 in enumerate(annotated_paragraphs1):
            text1 = para1["text"]

            similarity = similarity_calculator.calculate_similarity(text1, text2)
            if similarity > max_similarity:
                max_similarity = similarity
                max_idx1 = idx1

        if max_similarity > similarity_threshold:
            matched_para1.add(max_idx1)
            matched_para2.add(idx2)

            highlighted_para1, highlighted_para2 = mismatch_highlighter.highlight_mismatches(
                annotated_paragraphs1[max_idx1]["text"], text2
            )
            results.append({
                "paragraph_no_1": max_idx1 + 1,
                "paragraph_text_1": highlighted_para1,
                "clause_types_1": annotated_paragraphs1[max_idx1].get("clause_types", ["unknown"]),
                "paragraph_no_2": idx2 + 1,
                "paragraph_text_2": highlighted_para2,
                "clause_types_2": para2.get("clause_types", ["unknown"]),
                "similarity": max_similarity
            })

        else:
            unique_in_doc2.append({
                "paragraph_no": idx2 + 1,
                "paragraph_text": text2,
                "clause_types": para2.get("clause_types", ["unknown"])
            })

    for idx1, para1 in enumerate(annotated_paragraphs1):
        if idx1 not in matched_para1:
            unique_in_doc1.append({
                "paragraph_no": idx1 + 1,
                "paragraph_text": para1["text"],
                "clause_types": para1.get("clause_types", ["unknown"])
            })

    return jsonify({
        "results": results,
        "unique_in_contract1": unique_in_doc1,
        "unique_in_contract2": unique_in_doc2
    })

if __name__ == '__main__':
    app.run(debug=True)
