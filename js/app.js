//Variables 
    const tweetList = document.getElementById('tweet-list');

//Event listener
    eventListeners();


    //form submission
    function eventListeners(){
        document.querySelector('#form').addEventListener('submit', newTweet);

    // Remove tweet from the list
    tweetList.addEventListener('click', removeTweet);
    }

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);




//Functions
    function newTweet(e) {
        e.preventDefault();

        //read the textarea value
        const tweet = document.getElementById('tweet').value;
        
       // Create the remove button
       const removeBtn = document.createElement('a');
       removeBtn.classList = 'remove-tweet';
       removeBtn.textContent = 'X';
        
        // create an <li> element using JS
        const li = document.createElement('li');
        li.textContent = tweet;
        

        // Add the remove btn class to each tweet 
        li.appendChild(removeBtn);

        // Add to the list
        tweetList.appendChild(li);
        
        // Add to loal storage
        addTweetLocalStorage(tweet);

        this.reset();

    }

    // Remove tweets from the DOM
    function removeTweet(e) {
        if(e.target.classList.contains('remove-tweet')) {
            e.target.parentElement.remove();
        }

        // remove from storage
        removeTweetLocalStorage ( e.target.parentElement.textContent );

    }

    // Adds the tweet to locl storage
    function addTweetLocalStorage(tweet) {
        let tweets = getTweetsFromStorage();

        // add the tweet into the array
        tweets.push(tweet);

        // convert tweet array into string
        localStorage.setItem('tweets', JSON.stringify( tweets)); 
         
    }

    function getTweetsFromStorage() {
        let tweets;
        const tweeetsLS = localStorage.getItem('tweets');
        // get the values, if null is returned then we create an empty array
        if(tweeetsLS === null) {
            tweets = [];
        } else {
            tweets = JSON.parse( tweeetsLS );
        }
        return tweets;
    }

    // Print local storage tweets on load
    function localStorageOnLoad() {
        let tweets = getTweetsFromStorage();

        // loop throught storage and then print the values
        tweets.forEach(function(tweet) {
                // Create the remove button
                const removeBtn = document.createElement('a');
                removeBtn.classList = 'remove-tweet';
                removeBtn.textContent = 'X';
                
                // create an <li> element using JS
                const li = document.createElement('li');
                li.textContent = tweet;
                

                // Add the remove btn class to each tweet 
                li.appendChild(removeBtn);

                // Add to the list
                tweetList.appendChild(li);

        });
    }

    // remove tweet from local storage
    function removeTweetLocalStorage(tweet) {
        // get tweets from storage
        let tweets = getTweetsFromStorage();

        // remove the X fro the tweets
        const tweetDelete = tweet.substring( 0, tweet.length -1);

        // loop throught the twets and remove the tweets thats equal
        tweets.forEach(function(tweetLS, index) {
            if(tweetDelete === tweetLS) {
                tweets.splice(index, 1);
            }
        });

        // save the data
        localStorage.setItem('tweets', JSON.stringify(tweets));

    }