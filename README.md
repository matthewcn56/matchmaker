# MatchMaker: QWERHacks 2021 Submission
Let's play matchmaker! Recommend matches for your friends and swipe on your recommendations.
![logo](https://cdn.discordapp.com/attachments/934346810644897853/934808684951916624/iPhone_11_Pro.png)
## Inspiration
One of our favorite pasttimes as a friend group is swiping on each other's dating apps. (I promise, it's a lot more fun than swiping on your own!) We decided to streamline this process into an app where you can not only "swipe" for your friends but also see who they recommend for you. However, another really important inspiration for this app was improving the dating process for queer individuals. Often times, a queer person's experience on traditional dating apps is filled with fake accounts, people looking for friends, and people of the non-prefered gender. With our app, we hope to eliminate that by having friends recommend people they think you would like. Although our app is not an exclusively-queer dating app, we hope that it will allow for a safer and more connected dating experience within the LGBT community.

## What it does

### User
First, the user logs in with Google authentication. If the user is new to the app, they are led to a profile set up page. Here they can specify their personal information and who they are looking for on the app.
<div>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934836635940585472/IMG_3951.PNG" width="200"/>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934837985973764218/0D84B420-B96C-4F9A-9BE1-ED474A0DE839.png" width="200"/>
</div>
For a revisiting user, their profile is visible once they log back on to the app. A user's profile page shows any friend requests the user has. 
<div>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934836636167053312/IMG_3952.PNG" width="200"/>
</div>
  They can also find friends by searching by display name. The search algorithm updates the suggested users shown as soon as the user types another letter in their query.
<div>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934836635709882458/IMG_3954.PNG" width="200"/>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934836635772784690/IMG_3953.PNG" width="200"/>
</div>

### Matchmake
The Matchmake page is the heart of our application. Here you can scroll through a feed of profiles and recommend profiles to your friends.
<div>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934836638595563540/IMG_3957.PNG" width="200"/>
</div>

### Swipe your recommendations
Once your friends have recommended people to you. If both people "swipe right", a match is made!
<div>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934836636871720981/IMG_3955.PNG" width="200"/>
</div>
### Chat
This one's pretty simple: here you can chat with your matches. A chat window is automatically made with every match. Once you start talking to your match, our chat feature keeps track of your messages in real-time. Left the chat page? No worries! Click on the user to return to your chat.
<div>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934836635642789978/IMG_0132.JPEG" width="200"/>
</div>

## How we built it

### Design Flow
We started with a basic wireframe to lay out the pages of our design (ft. Wordle scratch work). Check it out below!
<div>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934811105484767292/unknown.png" width="200"/>
</div>

We then came up with a color scheme and logo. After that, we were ready to start hacking!
<div>
<img src="https://cdn.discordapp.com/attachments/934346810644897853/934812095273390100/logo.png" width="200"/>
  </div>

### Frontend
Our frontend was built as a React Native mobile app using Expo, capable of running on both iOS and Android mobile devices. 

### Backend
Our backend was built with Firebase. It stores the user's personal information, friends, matches, and chat messages.

## Challenges & Accomplishments
* Archie: "It was a challenge to figure out what libraries to use for the different types of inputs we had to use across the app, but I'm proud of coding the entire UI within a day! I've improved a lot with styling in React Native"
* Matt: "My challenge and accomplishment are the same: the chat feature. It was a lot of work to implement, but I'm proud that I got it working!"
* Edmond: "It was challenging to figure out JS syntax and debugging issues. But, it was nice to feel my React skills improve over the last two days. I went from not knowing anything at all to being able to solve problems on my own."

## What's next
The MatchMaker team is excited to see where this project goes in the future! Some features we would like to implement in the future include a more sophisticated feed algorithm/friend suggestion algorithm, more dynamic UI, more information on a person's profile (such as hobbies, stickers, and job), and report features in the chat.
