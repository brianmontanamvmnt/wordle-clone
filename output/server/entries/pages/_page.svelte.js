import { c as create_ssr_component } from "../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-36p1lv_START -->${$$result.title = `<title>Wordle Clone: Home</title>`, ""}<!-- HEAD_svelte-36p1lv_END -->`, ""}

<h1 style="${"text-align: center;"}">Welcome to the Wordle Clone</h1>

<ol><li>You have six tries to guess the five-letter Wordle of the day.</li>
    <li>Type in your guess and submit your word by hitting the “enter” key on the Wordle keyboard.</li>
    <li>The color of the tiles will change after you submit your word. A yellow tile indicates that you picked the right letter but it’s in the wrong spot. The green tile indicates that you picked the right letter in the correct spot. The gray tile indicates that the letter you picked is not included in the word at all.</li>
    <li>Continue until you solve the Wordle or run out of guesses. Good luck!</li></ol>

<a href="${"/start"}"><h2>Let&#39;s start!</h2></a>`;
});
export {
  Page as default
};
