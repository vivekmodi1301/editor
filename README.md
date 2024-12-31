Video of the Above Project: 
https://github.com/user-attachments/assets/513ef1c8-7106-4ff2-85a2-04186a0969e8


# React Sorcerer Take Home Test

## Assignment

You need to create an editor using Draft.js within ReactJS with the following specifications:

- There are three main components in the layout: Title, Button and Editor
    
    ![assignment.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/89581388-a27d-4d56-8a46-15ebbde73839/assignment.png)
    
- The editor needs to be written in Draft.js
    - Typing `#` as the first string in a line & pressing space should make anything you type afterwards on the same line be in a “Heading” format. On pressing space the aforementioned `#` should disappear.
        - See “This is a heading” line in the layout image above.
    - Similarly, typing `*` as the first string in a line and pressing space should correspond to “bold” format
    - `**` and space = red line
    - `***` and space = underline
- Pressing `Save` button should persist everything typed in the editor into `localstorage`. On refreshing the page,  the saved info should be refilled into the editor.
