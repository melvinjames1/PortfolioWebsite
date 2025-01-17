import { Component, ElementRef, Renderer2 , Input } from '@angular/core';

import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
    imports: [CommonModule]
})
export class ProjectsComponent {
  constructor(private el: ElementRef, private renderer: Renderer2){

  }
  python = [
    {
      title: "PyTube",
      code: `from pytube import Playlist

def download_playlist(playlist_url, download_path='.'):
    try:
        # Create a Playlist object
        playlist = Playlist(playlist_url)

        # Print the playlist title
        print(f'Downloading playlist: {playlist.title}')

        # Iterate over all videos in the playlist
        for video in playlist.videos:
            try:
                # Print the title of the video being downloaded
                print(f'Downloading video: {video.title}')

                # Download the video to the specified path
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
    description:`This code is a simple tool designed to help you download all the videos from a YouTube playlist to your computer. By providing the link to the playlist and specifying a folder where the videos should be saved, the tool will fetch each video from the playlist and download it in the highest available quality. It keeps you updated on the progress by showing the title of the playlist and each video being downloaded. If it encounters an issue with a particular video, it will notify you and move on to the next one. This way, you can easily save your favorite playlists for offline viewing without any hassle.`,
    repoLink: "https://github.com/melvinjames1/pomodoro-timer",
    
    },
    {
      title: "Recipe Generator",
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
    else:
        print(f"Error: {response.status_code}")
        return None

def main():
    
    api_key = 'aff346b8f1ef4bc5b15e0a42deb64dde'

 
    user_input = input("Enter your available ingredients (comma separated): ")
    available_ingredients = [ingredient.strip().lower() for ingredient in user_input.split(",")]


    recipes = get_recipes(api_key, available_ingredients)

    if recipes:
        print("You can make the following recipes:")
        for recipe in recipes:
            print(f"- {recipe['title']}")
            print(f"  Used ingredients: {', '.join([ingredient['name'] for ingredient in recipe['usedIngredients']])}")
            print(f"  Missing ingredients: {', '.join([ingredient['name'] for ingredient in recipe['missedIngredients']])}")
            print(f"  Recipe link: https://spoonacular.com/recipes/{recipe['title'].replace(' ', '-')}-{recipe['id']}")
    else:
        print("No recipes found with the given ingredients.")

if __name__ == "__main__":
    main()`,
    description: `This Python program helps users find recipes based on the ingredients they already have. Using the Spoonacular Recipe API, it takes a list of ingredients provided by the user, searches for matching recipes, and returns a list of dishes they can prepare. For each recipe, it displays the name, the ingredients used, the ones missing, and a direct link to the full recipe. It ensures convenience by ranking recipes based on the most ingredients matched while providing a user-friendly experience. This tool is perfect for anyone looking to make the most of their available ingredients and reduce food waste.`,
    repoLink: "https://github.com/melvinjames1/Python-recipe-generator/blob/main/recipe.py",
    
    },
    {
      title:'Sentiment Analysis',
      code:`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load data from a CSV file
# Assume the CSV file has a "Text" column and a "Label" column for supervised learning
data = pd.read_csv("yourfilepath")  # Replace with your CSV file path

# Split data into features and labels
X = data["Text"]
y = data["Label"]

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Convert text data into TF-IDF features
vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Initialize a Logistic Regression model
model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)

# Predict sentiment labels for the test set
y_pred = model.predict(X_test_tfidf)

# Calculate accuracy and display evaluation metrics
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
confusion = confusion_matrix(y_test, y_pred)

print(f"Accuracy: {accuracy:.2f}")
print("\nClassification Report:\n", report)
print("\nConfusion Matrix:\n", confusion)

# Apply the model to the entire dataset and save the predictions to a new CSV file
data["Predicted_Sentiment"] = model.predict(vectorizer.transform(X))
data.to_csv("sentiment_predictions.csv", index=False)
print("\nPredictions saved to 'sentiment_predictions.csv'.")`,
        description:`This Python program performs sentiment analysis on a text dataset using logistic regression. It begins by loading the data, which includes a "Text" column containing the text and a "Label" column for sentiment categories. The text data is then converted into numerical features using TF-IDF vectorization. The dataset is split into training and testing sets, and a logistic regression model is trained to predict sentiment labels. The model's performance is evaluated using accuracy, classification report, and a confusion matrix. Finally, the model is applied to the entire dataset to predict sentiments, and the results are saved to a new CSV file. This tool is useful for tasks such as analyzing customer reviews or social media posts, providing an automated way to classify text data by sentiment.`,
        repoLink:'https://github.com/melvinjames1/Sentiment-Analysis/blob/main/sentimentanalysis.py'
    }
  ]
 
  
  websites = [
    {
      title: "Pomodoro Timer",
      image: "assets/pt.png",
      description: "A productivity tool built using JavaScript and HTML. It helps users manage their time efficiently by breaking work into intervals.This tool allows you to set Pomodoro intervals with breaks in between and tracks your focus time for increased productivity.",
      link: "https://pomodoro-timer12.netlify.app/",
      repoLink: "https://github.com/melvinjames1/pomodoro-timer",

    },
    {
      title: "Favourite Movie Blog",
      image: "assets/fmb.png",
      description: "This is a simple website built using Angular that displays all of my favourite movies from Hollywood, Bollywood, and Anime.It features a responsive design with a categorized list of movies, each with descriptions.",
      link: "https://main--myfavouritemoviesblog1.netlify.app/Favourite-Movies-Blog/",
      repoLink: "https://github.com/melvinjames1/FMB",
      
    },
    {
      title: "Joke Generator",
      image: "assets/JokeGen.png",
      description: "A simple website built using React and Random Joke API to render random jokes from the API database using Axios.With a click of a button, you can generate random jokes fetched from an API and displayed on the page.",
      link: "https://main--jokegenarator.netlify.app/",
      repoLink: "https://github.com/melvinjames1/joke-generator",
      details: "With a click of a button, you can generate random jokes fetched from an API and displayed on the page.",
    },
    {
      title: "Travellers Guide",
      image: "assets/Tg.png",
      description: "A simple Website Built Using HTML, CSS, JavaScript to allow users to gt details of a entered Country that they  want to travell to or are currently in, Th Details are fetched from  3rd party country api",
      link: "https://main--travellersguide576.netlify.app/",
      repoLink: "https://github.com/melvinjames1",
      details: "With a click of a button, you can generate random jokes fetched from an API and displayed on the page.",
    }
  ];
  ngAfterViewInit() {
    const sections = this.el.nativeElement.querySelectorAll('.section-content') as NodeListOf<HTMLElement>;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target as HTMLElement, 'fade-in');
        } else {
          this.renderer.removeClass(entry.target as HTMLElement, 'fade-in');
        }
      });
    });

    sections.forEach((section: HTMLElement) => observer.observe(section));
    const codeElements = this.el.nativeElement.querySelectorAll('pre code');
    codeElements.forEach((block: HTMLElement) => {
      (window as any).hljs.highlightElement(block);
    });
  }

}
