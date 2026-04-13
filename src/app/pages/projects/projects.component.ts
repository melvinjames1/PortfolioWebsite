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

  python = [
    {
      title: 'PyTube Playlist Downloader',
      description:
        'A tool to download all videos from a YouTube playlist at the highest available resolution. Displays download progress, handles per-video errors gracefully, and saves to a specified local path.',
      repoLink: 'https://github.com/melvinjames1/pomodoro-timer',
      code: `from pytube import Playlist

def download_playlist(playlist_url, download_path='.'):
    try:
        playlist = Playlist(playlist_url)
        print(f'Downloading playlist: {playlist.title}')

        for video in playlist.videos:
            try:
                print(f'Downloading: {video.title}')
                video.streams.get_highest_resolution().download(download_path)
            except Exception as e:
                print(f'Error downloading {video.title}: {e}')

        print('Playlist download complete!')
    except Exception as e:
        print(f'Error accessing playlist: {e}')

if __name__ == '__main__':
    playlist_url = 'Your-Playlist-Url'
    download_path = './downloads'
    download_playlist(playlist_url, download_path)`,
    },
    {
      title: 'Recipe Generator',
      description:
        'Finds recipes based on ingredients you already have using the Spoonacular API. Displays the recipe name, matched ingredients, missing ones, and a direct link — perfect for reducing food waste.',
      repoLink: 'https://github.com/melvinjames1/Python-recipe-generator/blob/main/recipe.py',
      code: `import requests

def get_recipes(api_key, ingredients):
    url = "https://api.spoonacular.com/recipes/findByIngredients"
    params = {
        'apiKey': api_key,
        'ingredients': ','.join(ingredients),
        'number': 5,
        'ranking': 1
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    return None

def main():
    api_key = 'YOUR_API_KEY'
    user_input = input("Enter ingredients (comma separated): ")
    ingredients = [i.strip().lower() for i in user_input.split(",")]
    recipes = get_recipes(api_key, ingredients)

    if recipes:
        for recipe in recipes:
            print(f"- {recipe['title']}")
            print(f"  Used: {', '.join([i['name'] for i in recipe['usedIngredients']])}")
            print(f"  Missing: {', '.join([i['name'] for i in recipe['missedIngredients']])}")

if __name__ == "__main__":
    main()`,
    },
    {
      title: 'Sentiment Analysis',
      description:
        'Performs sentiment classification on a text dataset using TF-IDF vectorization and Logistic Regression. Evaluates with accuracy score, classification report, and confusion matrix — then exports predictions to CSV.',
      repoLink: 'https://github.com/melvinjames1/Sentiment-Analysis/blob/main/sentimentanalysis.py',
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

data = pd.read_csv("yourfilepath")
X = data["Text"]
y = data["Label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)

y_pred = model.predict(X_test_tfidf)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
print(classification_report(y_test, y_pred))

data["Predicted"] = model.predict(vectorizer.transform(X))
data.to_csv("sentiment_predictions.csv", index=False)`,
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

  copyToClipboard(code: string, index: number): void {
    navigator.clipboard.writeText(code).then(() => {
      const el = document.getElementById(`message-${index}`);
      if (el) {
        el.textContent = 'Copied!';
        setTimeout(() => (el.textContent = 'Copy'), 2000);
      }
    });
  }
}