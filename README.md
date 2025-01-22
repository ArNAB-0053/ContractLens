# Business Contract Validation and Comparison Application - **ContractLens**  

**ContractLens** is a project developed to simplify the management of legal contracts. It provides features like text extraction, contract comparison, and validation to assist businesses in analyzing and ensuring the integrity of their contracts. This tool is designed to be practical, functional, and user-friendly.

---

## 📹 Demo

Watch our project demonstration:
[Contract Analysis Demo Video](https://drive.google.com/file/d/1uWV79eEbc8ND_0T1_mRKzVaqGtEqEWKZ/view?usp=sharing)

---

## 🌟 Features Overview  

### 📝 **Text Extraction**  
- Extract clean, formatted text from uploaded business contract files.  
- Ensure accurate parsing with support for complex legal text structures.  

### 📄 **Contract Comparison**  
- Highlight differences and similarities between two contracts side-by-side.  
- Detect clauses and validate key sections for potential conflicts or mismatches.  

### ✅ **Business Contract Validation**  
- Analyze contracts to ensure they comply with pre-defined standards and legal guidelines.  
- Flag missing clauses, risky language, or deviations from best practices.  
- **Similarity Checking**: Calculate the similarity between sections of two contracts.  
- **Highlighting Differences**: Identify and visually highlight mismatched or differing clauses.  
- **Clause Detection and Matching**:  
  - Detect and show **specific clauses** for better evaluation.  
  - Powered by a trained model utilizing the [Legal Clause Dataset](https://www.kaggle.com/datasets/bahushruth/legalclausedataset) to ensure accurate and context-aware clause extraction.  


---

## 🔄 Workflow  

1. **PDF Upload**: Upload business contract files in PDF format.  
2. **Text Extraction**: Extract text from the PDF for analysis.  
3. **Text Preprocessing**:  
   - Perform text cleaning, including lemmatization and stopword removal.  
   - Convert text into vectorized format using pre-trained models.  
   - Extract paragraphs for detailed comparison.  
4. **Paragraph Matching**: Map corresponding paragraphs for side-by-side evaluation.  
5. **Similarity Calculation**: Compare mapped paragraphs for textual similarity.  
6. **Difference Highlighting**: Visually indicate differences in structure, content, or language.![workfllow](https://github.com/user-attachments/assets/5e8ee7b4-d6ea-4ebc-bc42-679bf1d3e2d8)

7. **Clause Prediction**: Identify and predict **specific clauses** in contracts using a trained model. 

---  

## ⚙️ Tech Stack  

### 🧠 **Machine Learning**  
- **Python**: Primary programming language for ML tasks.  
- **NLP Libraries**:  
  - `TfidfVectorizer`: For text feature extraction and transformation.  
  - `joblib`: For saving and loading serialized machine learning models.  
  - `nltk`: For text preprocessing, tokenization, and stopword removal.  
  - `spaCy`: For advanced natural language processing and tokenization.  
  - `re`: For text cleaning and processing via regular expressions.  
  - `cosine_similarity`: To compute textual similarity between segments using vectorized data.  
  - `difflib`: For identifying and visually highlighting textual differences.  
- **ML Models & Tools**:  
  - `LabelEncoder`: Used for encoding target variables in the clause dataset.  
  - `MLPClassifier`: For training multilayer perceptron neural networks on clause data.  
  - `SVC (Support Vector Classifier)`: Applied for classification tasks in model training.  
  - `LogisticRegression`: Used for modeling relationships and classification.  
  - `VotingClassifier`: Combined predictions from multiple models for improved accuracy.  
- **Visualization**:  
  - `matplotlib`: Used for plotting and visualizing data insights during model evaluation.  

### 🖥️ **Backend**  
- **Flask**: Lightweight web framework for API endpoints.  
- **Flask-CORS**: To handle cross-origin requests, ensuring seamless frontend-backend communication.  
- **PyMuPDF (fitz)**: For high-performance PDF-to-text extraction.  
- **Werkzeug**: For secure file management and utilities like `secure_filename`.  

### 🌐 **Frontend**  
- **Next.js**: For server-side rendering (SSR) and static site generation (SSG), enabling efficient data handling.  
- **React.js**: Used for developing a dynamic and responsive user interface.  
- **Tailwind CSS**: Utility-first CSS framework for styling and responsive design.  
- **ShadCN**: For pre-styled components and design customization.  

### 🛠️ **Additional Tools**  
- **Typing (`List`, `Dict`)**: For structured type annotations in Python functions and methods.  
- **nltk.tokenize**: Used for breaking text into individual words or sentences.  

---  

## ⚠️ Troubleshooting

- If package installation fails, check individual package documentation
- Ensure all prerequisites are properly installed
- Keep dependencies updated to latest stable versions

## 📝 Notes

1. **Local Usage**  
   - The application is not hosted and relies on **local storage** (your PC/Laptop, not browser-based) for certain tasks.  
   - Please **carefully read and understand the code** before using or modifying it to ensure compatibility with your environment.  

2. **Planned Enhancements**  
   Some functionalities are not fully implemented yet, but they **may be added in the future** as the project evolves. Stay tuned! 🚀 

## 👥 Team

This project was collaboratively developed as part of the **IntelUnnati Training Program**. It was a **team effort**, and I acknowledge the significant contributions of my team members. While I made several modifications to the backend logic and frontend interface, the core implementation is a shared achievement. 👫🤝  

## 📝 Development Notes

- Backend uses Flask for API endpoints
- Frontend built with Next.js
- SpaCy model required for text processing
- Both servers must run simultaneously for full functionality
