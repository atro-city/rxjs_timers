import "./styles.css";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/map";
import "rxjs/add/observable/timer";

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

let button1stop = document.getElementById("button1stop");
let button2stop = document.getElementById("button2stop");
let button3stop = document.getElementById("button3stop");

let button1re = document.getElementById("button1re");
let button2re = document.getElementById("button2re");
let button3re = document.getElementById("button3re");

button1stop.hidden = true;
button2stop.hidden = true;
button3stop.hidden = true;
button1re.hidden = true;
button2re.hidden = true;
button3re.hidden = true;

const timer1 = {
  id: "timer 1",
  timer: Observable.timer(0, 1000),
  pauseValue: 0,
  currentValue: 0,
  paused: false,
  sub: Subscription
};

const timer2 = {
  id: "timer 2",
  timer: Observable.timer(0, 500),
  pauseValue: 0,
  currentValue: 0,
  paused: false,
  sub: Subscription
};

const timer3 = {
  id: "timer 3",
  timer: Observable.timer(0, 250),
  pauseValue: 0,
  currentValue: 0,
  paused: false,
  sub: Subscription
};

Observable.fromEvent(button1, "click").subscribe(() => {
  startTimer(timer1);
  button1.hidden = true;
  button1stop.hidden = false;
  button1re.hidden = false;
});

Observable.fromEvent(button1stop, "click").subscribe(() => {
  if (timer1.paused === false) pauseTimer(timer1);
  else {
    timer1.paused = false;
    startTimer(timer1);
  }
});

Observable.fromEvent(button1re, "click").subscribe(() => {
  timer1.sub.unsubscribe();
  timer1.currentValue = 0;
  timer1.pauseValue = 0;
  button1.hidden = false;
  button1stop.hidden = true;
  button1re.hidden = true;
});

Observable.fromEvent(button2, "click").subscribe(() => {
  startTimer(timer2);
  button2.hidden = true;
  button2stop.hidden = false;
  button2re.hidden = false;
});

Observable.fromEvent(button2stop, "click").subscribe(() => {
  if (timer2.paused === false) pauseTimer(timer2);
  else {
    timer2.paused = false;
    startTimer(timer2);
  }
});

Observable.fromEvent(button2re, "click").subscribe(() => {
  timer2.sub.unsubscribe();
  timer2.currentValue = 0;
  timer2.pauseValue = 0;
  button2.hidden = false;
  button2stop.hidden = true;
  button2re.hidden = true;
});

Observable.fromEvent(button3, "click").subscribe(() => {
  startTimer(timer3);
  button3.hidden = true;
  button3stop.hidden = false;
  button3re.hidden = false;
});

Observable.fromEvent(button3stop, "click").subscribe(() => {
  if (timer3.paused === false) pauseTimer(timer3);
  else {
    timer3.paused = false;
    startTimer(timer3);
  }
});

Observable.fromEvent(button3re, "click").subscribe(() => {
  timer3.sub.unsubscribe();
  timer3.currentValue = 0;
  timer3.pauseValue = 0;
  button3.hidden = false;
  button3stop.hidden = true;
  button3re.hidden = true;
});

let startTimer = object => {
  object.sub = object.timer.subscribe(x => outputTimer(object, x));
};

let outputTimer = (object, currentValue) => {
  console.log(
    object.id + ": " + (object.currentValue = currentValue + object.pauseValue)
  );
};

let pauseTimer = object => {
  object.sub.unsubscribe();
  object.paused = true;
  object.pauseValue = object.currentValue + 1;
};
