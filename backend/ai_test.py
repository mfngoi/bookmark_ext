from sklearn.datasets import fetch_20newsgroups  # dataset
from sklearn.feature_extraction.text import CountVectorizer  # tool to count words in dataset
from sklearn.feature_extraction.text import TfidfTransformer  # tool to configure dataset for machine learning
from sklearn.pipeline import Pipeline
from sklearn.linear_model import SGDClassifier  # SVM Classifier

types = ['comp.graphics', 'rec.motorcycles', 'rec.sport.baseball', 'sci.med','sci.space', 'soc.religion.christian', 'talk.politics.mideast']

dataset_train = fetch_20newsgroups(subset='train', shuffle=True, random_state=42)
pipeline = Pipeline([
                      ('vect', CountVectorizer()),  # Word Count
                      ('tfidf', TfidfTransformer()),  # Word Frequency
                      ('clf', 
                SGDClassifier(loss='hinge',penalty='l2',alpha=1e-3,random_state=42,max_iter=5,tol=None)),])

pipeline.fit(dataset_train.data, dataset_train.target)

input = "https://religionnews.com/2023/04/24/muslim-rideshare-drivers-improvise-prayer-spaces-amid-lack-of-relief-stations-in-nyc/"
sentence = [input]
a = pipeline.predict(sentence)
num = a[0]
genre = dataset_train.target_names[num]
print(genre)
