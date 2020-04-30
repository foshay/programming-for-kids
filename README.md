# Programming-for-Kids (Native Coder Creator)
Native Coder Creator is a web based application served via an Intel NUC or other wifi hotspot enabled linux system. 

The application in a broad view, provides an environment that teaches users with slow / no access to the internet computer science topics progressing from "Hello World" to machine learning.

The application is served via an Intel NUC and accessed via the web browser. The lessons are stored locally so don't require an internet connection to complete. The lessons are completed using [Google's Blockly ](https://developers.google.com/blockly) and graded via custom python scripts.
In the future, users will be awarded with cards on lesson completion to be used in a card game.

To work on the project you will need node version 13.8.x. To work with the Intel Neural Compute Stick 2 for AI lessons in the future you will need Ubuntu 18.x
1. Clone the repo by doing ```git clone https://github.com/foshay/programming-for-kids.git```
2. Run the ```setup.sh``` file in the `setup` directory to install all dependencies.
3. Run ```start.sh``` in the main directory to start the application.