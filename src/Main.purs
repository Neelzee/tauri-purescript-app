module Main
  ( main
  )
  where

import Prelude

import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Promise as P
import Tauri (greet)
import Web.DOM.Element (Element, toEventTarget, toNode)
import Web.DOM.Node (setTextContent)
import Web.DOM.ParentNode (QuerySelector(..), querySelector)
import Web.Event.Event (Event, EventType(..), preventDefault)
import Web.Event.EventTarget (addEventListener, eventListener)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toParentNode)
import Web.HTML.HTMLInputElement as I
import Web.HTML.Window (document)
-- This example is the same as the Tauri + JavaScript example
main :: Effect Unit
main = do 
  w <- window -- Gives the current window
  doc <- document w -- Gives the document to the window
  {- Because of PureScript, we need to turn the document, which is of type
  -- HTMLDocument, into a ParentNode, so that we can use querySelection to get
  -- the form and input.
  -}
  let documentParent = toParentNode doc
  {- Equivalent to:
  -- greetInputEl = document.querySelector("#greet-input");
  -- Except querySelector returns Maybe Element, so for the greetInputEl, we
  -- need to "cast" it to HTMLInputElement, but our Element might not be of
  -- that type, so we need to handle that aswell.
  -}
  greetFormElementM <- querySelector (QuerySelector "#greet-form") documentParent
  greetInputElementM <- querySelector(QuerySelector "#greet-input") documentParent
  greetMsgElementM <- querySelector(QuerySelector "#greet-msg") documentParent
  -- This is not great PureScript code
  case (Tuple greetFormElementM (Tuple (greetInputElementM >>= I.fromElement) greetMsgElementM)) of
    Tuple (Just greetFormElement) (Tuple (Just inputElement) (Just greetElement)) -> do
      -- To add an eventListener, we need a Node type, which all Elements are.
      let eventTarget = toEventTarget greetFormElement
      greetEvent <- eventListener (greetCallback greetElement)
      addEventListener (EventType "submit") greetEvent false eventTarget
      where
        greetCallback :: Element -> Event -> Effect Unit
        greetCallback greetMsgElement evt = do
          -- Preventing the form from being sent
          _ <- preventDefault evt
          {- Getting the value from the inputElement, we have to do this in the
          -- callback, because we are only interested in the contents of the
          -- input-element *after* the user has clicked on submit. If we did
          -- this before, i.e. in the main-function, it would be empty.
          -}
          name <- I.value inputElement
          -- Invoking greet
          let promise = (greet name)
          {- Using invoke makes things a little more complicated, because it is
          -- a promise, so we need *another* callback.
          -}
          _ <- P.then_ (setGreetingCallback greetMsgElement) promise
          mempty
        setGreetingCallback :: Element -> String -> Effect (P.Promise Unit)
        setGreetingCallback greetMsgElement greeting = do
          -- Finally, we can set the content of the greetMsg element.
          _ <- setTextContent greeting (toNode greetMsgElement)
          pure (P.resolve unit)
    _ -> mempty
