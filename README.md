
***

![codechat ui](http://www.ericmcd.com/blog/img/codechat-new-1.jpg) 

***

#codechat

A collaborative chat application with a real time code interface built with Derby JS and SUIT CSS components. In order to set this project up you will need the dependencies for Derby including Redis and MongoDB.

#####Note: there is a bug currently that sometimes prevents you from going to new rooms from the command line/room input. If you experience this, you can simply go the the URL localhost:3000/codechat/{room} in your browser.

##Install

Clone into a directory and run: `npm install`, `npm start`

Navigate to localhost:3000/ to access the client application.

##Commands

Type commands in the command bar in the footer. You must prefix a command with . or /

####about
Learn more about codechat.

####room (name)
Move to a room.

ex. `/room jquery-testing` will take you to the room 'jquery-testing'. 


####users (room)
Get users in current room or specified room.

ex. `/users lobby` would output the users in the room 'lobby'.

####start [packages...]
Set up a template for your new project using specified packages. Currently supports:

'jquery': jQuery

'zepto': zepto.js

'three': three.js

'normalize': Normalize.css

'layout': adds a container div wrapping an HTML5 header and footer

'canvas': simply appends a canvas element to the HTML

ex: `/start jquery normalize` will append a jQuery CDN script tag in the script container and a Normalize CDN link tag in the style container. After the project is started the code is automatically refreshed. 

#####Note: if left blank, this command will generate a project with empty `<style>`, `<script>` and `<div>` tags in the respective containers.

####refresh [all]
Refresh the code window for yourself or all users in the room.

ex: `/refresh all` will refresh the code for all users in the current room. This is necessary after script updates or if your code is rendering improperly.

####empty (code(type)|chat)
Empty the code or chat messages in the current room. Can pass `html`, `css` or `js` to empty a specific type of code.

ex: `/empty code` will set all of your code containers to an empty string. 

####color (num)
Change your user color. Accepts values from 0-10.

ex: `/color 0` = burnt orange, `/color 4` = green, `/color 9` = light blue.

####server ("string")
Echo a userless server message to the current room.

ex: `/server "There really is no need for this command"` would emit "There really is no need for this command" to the current room.

##Keybindings

' / '     - Reveal Code Editor

' . '     - Expand Code Panel

' , '     - Expand Chat Panel

' Enter ' - Focus Command Input
