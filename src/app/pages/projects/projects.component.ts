import { Component, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrls: [],
  imports: [CommonModule],
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private revealObserver!: IntersectionObserver;

  // ─── AI / ML ─────────────────────────────────────────────────────────────────
  aiml = [
    {
      title: 'Local RAG System',
      description:
        'A fully local Retrieval-Augmented Generation pipeline that lets you query your own PDF documents using open-source LLMs — no cloud APIs, no data leaving your machine. Uses ChromaDB for persistent vector storage, HuggingFace embeddings, and Mistral via Ollama for private, offline question answering.',
      repoLink: 'https://github.com/melvinjames1/Local-RAG',
      tags: ['Python', 'LangChain', 'ChromaDB', 'HuggingFace', 'Ollama', 'Mistral', 'RAG'],
      code: `import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA

def load_documents(file_path):
    loader = PyPDFLoader(file_path)
    return loader.load()

def split_documents(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )
    return splitter.split_documents(documents)

def create_vector_store(chunks):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_db"
    )
    vectorstore.persist()
    return vectorstore

def load_vector_store():
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    return Chroma(
        persist_directory="./chroma_db",
        embedding_function=embeddings
    )

def create_qa_chain(vectorstore):
    llm = Ollama(model="mistral", temperature=0)
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),
        return_source_documents=True
    )

def main():
    pdf_path = "data/your_pdf.pdf"
    print("Loading PDF...")
    docs   = load_documents(pdf_path)
    chunks = split_documents(docs)

    if not os.path.exists("./chroma_db"):
        print("Creating vector DB...")
        vectorstore = create_vector_store(chunks)
    else:
        print("Loading existing DB...")
        vectorstore = load_vector_store()

    qa_chain = create_qa_chain(vectorstore)
    print("\\nRAG ready (LOCAL). Type 'exit' to quit.\\n")

    while True:
        query = input("Question: ")
        if query.lower() == "exit":
            break
        result = qa_chain.invoke({"query": query})
        print("\\nAnswer:\\n", result["result"])
        print("\\nSources:")
        for doc in result["source_documents"]:
            print("-", doc.metadata.get("source"))
        print("\\n" + "=" * 50 + "\\n")

if __name__ == "__main__":
    main()`,
    },
    {
      title: 'Sentiment Analysis',
      description:
        'Performs sentiment classification on a text dataset using TF-IDF vectorization and Logistic Regression. Evaluates with accuracy score, classification report, and confusion matrix — then exports predictions to CSV.',
      repoLink: 'https://github.com/melvinjames1/Sentiment-Analysis/blob/main/sentimentanalysis.py',
      tags: ['Python', 'scikit-learn', 'TF-IDF', 'Logistic Regression', 'NLP', 'pandas'],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

data = pd.read_csv("yourfilepath")
X = data["Text"]
y = data["Label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf  = vectorizer.transform(X_test)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)

y_pred = model.predict(X_test_tfidf)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

data["Predicted"] = model.predict(vectorizer.transform(X))
data.to_csv("sentiment_predictions.csv", index=False)
print("Predictions saved to sentiment_predictions.csv")`,
    },
  ];

  // ─── CYBER SECURITY ──────────────────────────────────────────────────────────
  cybersec = [
    {
      title: 'WAVS — Web App Vulnerability Scanner',
      description:
        'A full-featured web application vulnerability scanner that automates the security testing process. Runs SQL injection, XSS, security header checks, directory listing detection, and open port scanning against a target URL — then generates detailed HTML and PDF reports.',
      repoLink: 'https://github.com/melvinjames1/WAVS',
      tags: ['Python', 'SQL Injection', 'XSS', 'Port Scanner', 'Security Headers', 'HTML/PDF Report'],
      code: `import urllib.parse
from .vulnerabilities import (
    sql_injection, xss,
    security_headers, directory_listing, port_scanner
)
from .report.html_report import generate_html
from .report.pdf_report import generate_pdf

class Scanner:
    def __init__(self, target):
        self.target = target.rstrip('/')
        self.parsed = urllib.parse.urlparse(self.target)
        if not self.parsed.scheme:
            self.target = 'http://' + self.target
            self.parsed = urllib.parse.urlparse(self.target)

    def run_full_scan(self):
        report = {}
        report['sql_injection']     = sql_injection.test_sql_injection(self.target)
        report['xss']               = xss.test_xss(self.target)
        report['security_headers']  = security_headers.check_security_headers(self.target)
        report['directory_listing'] = directory_listing.check_directory_listing(self.target)

        host = self.parsed.hostname
        report['open_ports'] = port_scanner.scan_ports(host) if host else []

        return report

    def generate_html_report(self, report, filename):
        html = generate_html(report, self.target)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html)

    def generate_pdf_report(self, report, filename):
        generate_pdf(report, self.target, filename)`,
    },
    {
      title: 'SQL Injection Demo Site',
      description:
        'An interactive demo site where you can perform SQL injection attacks in a fully controlled environment. The database is hardcoded to safely visualise how SQL injection exploits work and how they affect the underlying data — built for learning and awareness.',
      repoLink: 'https://github.com/melvinjames1/SQL-Injection-Test',
      link: 'https://sql-injection-test-liard.vercel.app',
      tags: ['SQL Injection', 'Demo', 'Security Education', 'Vercel', 'Hardcoded DB'],
      code: `-- Hardcoded demo database schema
-- Safe sandboxed environment for SQL injection testing

CREATE TABLE users (
    id       INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role     TEXT DEFAULT 'user'
);

INSERT INTO users VALUES (1, 'admin',   'supersecret123', 'admin');
INSERT INTO users VALUES (2, 'alice',   'password123',    'user');
INSERT INTO users VALUES (3, 'bob',     'qwerty456',      'user');
INSERT INTO users VALUES (4, 'charlie', 'letmein789',     'user');

-- Vulnerable query (intentional — for demo purposes)
-- Input: ' OR '1'='1
SELECT * FROM users
WHERE username = '' OR '1'='1'
  AND password = '';

-- Result: returns ALL rows — auth bypassed
-- Shows exactly how unsanitised input
-- lets attackers dump the entire table.

-- Safe parameterised equivalent:
-- SELECT * FROM users
-- WHERE username = ? AND password = ?`,
    },
  ];

  // ─── WEBSITES ───────────────────────────────────────────────────────────────
  websites = [
    {
      title: 'Pomodoro Timer',
      image: 'assets/pt.png',
      description:
        'A productivity tool built with HTML, CSS and JavaScript implementing the Pomodoro Technique. Supports customizable work intervals, short and long breaks, and a visual timer — helping users stay focused and manage time efficiently.',
      link: 'https://pomodoro-timer12.netlify.app/',
      repoLink: 'https://github.com/melvinjames1/pomodoro-timer',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Favourite Movie Blog',
      image: 'assets/fmb.png',
      description:
        'An Angular app showcasing favourite movies from Hollywood, Bollywood, and Anime. Features a responsive Tailwind CSS design with movies organized into categories, each with detailed descriptions.',
      link: 'https://main--myfavouritemoviesblog1.netlify.app/Favourite-Movies-Blog/',
      repoLink: 'https://github.com/melvinjames1/FMB',
      tags: ['Angular', 'Tailwind CSS'],
    },
    {
      title: 'Joke Generator',
      image: 'assets/JokeGen.png',
      description:
        'A React app that fetches and displays random jokes from the Random Joke API using Axios. Users can generate new jokes with a click — clean UI, real-time API calls, and seamless state updates.',
      link: 'https://main--jokegenarator.netlify.app/',
      repoLink: 'https://github.com/melvinjames1/joke-generator',
      tags: ['React', 'Axios', 'REST API'],
    },
    {
      title: "Traveller's Guide",
      image: 'assets/Tg.png',
      description:
        'A country info tool built with HTML, CSS, and JavaScript. Users enter a country name and get details like capital, population, currency, and official languages — powered by the REST Countries API.',
      link: 'https://main--travellersguide576.netlify.app/',
      repoLink: 'https://github.com/melvinjames1',
      tags: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    },
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadAssets();
    setTimeout(() => this.initReveal(), 100);
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  private loadAssets(): void {
    const assets = [
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    ];
    assets.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'stylesheet');
        this.renderer.setAttribute(link, 'href', href);
        this.renderer.appendChild(document.head, link);
      }
    });
  }

  private initReveal(): void {
    const els = this.el.nativeElement.querySelectorAll('.reveal') as NodeListOf<HTMLElement>;
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.remove('opacity-0', 'translate-y-8');
          } else {
            (e.target as HTMLElement).classList.add('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => this.revealObserver.observe(el));
  }

  copyToClipboard(code: string, id: string | number): void {
    navigator.clipboard.writeText(code).then(() => {
      const el = document.getElementById(`message-${id}`);
      if (el) {
        el.textContent = 'Copied!';
        setTimeout(() => (el.textContent = 'Copy'), 2000);
      }
    });
  }
}