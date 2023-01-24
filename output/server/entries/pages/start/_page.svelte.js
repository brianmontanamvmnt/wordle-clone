import { c as create_ssr_component, e as escape, d as null_to_empty, v as validate_component, i as is_promise, n as noop, f as each } from "../../../chunks/index2.js";
import { w as writable } from "../../../chunks/index.js";
const Board = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section>${slots.default ? slots.default({}) : ``}</section>`;
});
const charItem_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "span.svelte-155d4ba{display:flex;justify-content:center;align-items:center;text-transform:capitalize;border:1px solid black;width:40px;height:40px;font-size:30px;margin:0.5rem}.correct.svelte-155d4ba{background-color:lightgreen}.incorrect.svelte-155d4ba{background-color:lightcoral}.close.svelte-155d4ba{background-color:lightgoldenrodyellow}",
  map: null
};
const CharItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { charState } = $$props;
  const charStateStyles = ["incorrect", "close", "correct"];
  if ($$props.charState === void 0 && $$bindings.charState && charState !== void 0)
    $$bindings.charState(charState);
  $$result.css.add(css$2);
  return `<span class="${escape(null_to_empty(charStateStyles[charState]), true) + " svelte-155d4ba"}">${slots.default ? slots.default({}) : ``}
</span>`;
});
const lineItem_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "div.svelte-18i1qbs{display:flex;justify-content:center}",
  map: null
};
const LineItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"svelte-18i1qbs"}">${slots.default ? slots.default({}) : ``}</div>`;
});
const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
const secretWordStore = writable("");
const guessesStore = writable(new Array(6).fill(null));
const currentGuessStore = writable("");
const wonGameStore = writable(false);
const getSecretWord = (words) => {
  return words[Math.floor(Math.random() * words.length)].toLowerCase();
};
const verifySecretWord = (guess, secretWord) => {
  const secretWordMap = {};
  const verifiedArr = new Array(WORD_LENGTH).fill(0);
  let count = 0;
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === guess[i]) {
      verifiedArr[i] = 2;
      count++;
    } else {
      secretWordMap[secretWord[i]] = (secretWordMap[secretWord[i]] || 0) + 1;
    }
  }
  if (count >= 5) {
    wonGameStore.update(() => true);
    return verifiedArr;
  }
  for (let i = 0; i < guess.length; i++) {
    if (secretWordMap[guess[i]] > 0) {
      secretWordMap[guess[i]]--;
      verifiedArr[i] = 1;
    }
  }
  return verifiedArr;
};
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-t8xzrw,h3.svelte-t8xzrw{text-align:center;text-transform:uppercase}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentGuessIndex;
  let currentGuessChars;
  const base = `http://wordle-clone.com/api`;
  async function fetchSecretWord() {
    try {
      const res = await fetch(`${base}/wordle`);
      const data = await res.json();
      if (data) {
        const secretWord2 = getSecretWord(data);
        secretWordStore.update(() => secretWord2);
        return secretWord2;
      } else {
        throw new Error("No data present");
      }
    } catch (e) {
      console.error(e);
    }
  }
  let secretWordStart = fetchSecretWord();
  let guesses = new Array(NUMBER_OF_GUESSES).fill(null);
  guessesStore.subscribe((value) => {
    guesses = value;
  });
  let winner = false;
  wonGameStore.subscribe((value) => {
    winner = value;
  });
  let secretWord = "";
  secretWordStore.subscribe((value) => {
    secretWord = value;
  });
  let currentGuess = "";
  currentGuessStore.subscribe((value) => {
    currentGuess = value;
  });
  $$result.css.add(css);
  currentGuessIndex = guesses?.findIndex((guess) => guess == null);
  currentGuessChars = currentGuess;
  return `${$$result.head += `<!-- HEAD_svelte-fyuy74_START -->${$$result.title = `<title>Wordle Clone: Start</title>`, ""}<!-- HEAD_svelte-fyuy74_END -->`, ""}



<h1 class="${"svelte-t8xzrw"}">Start!</h1>

${validate_component(Board, "Board").$$render($$result, {}, {}, {
    default: () => {
      return `${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return `
		<h3 class="${"svelte-t8xzrw"}">loading</h3>
	`;
        }
        return function(data) {
          return `
		${guesses.length ? `${each(guesses, (word, idx) => {
            return `${word && data ? `${validate_component(LineItem, "LineItem").$$render($$result, {}, {}, {
              default: () => {
                return `${each(verifySecretWord(word, data), (charState, jdx) => {
                  return `${validate_component(CharItem, "CharItem").$$render($$result, { charState }, {}, {
                    default: () => {
                      return `${escape(word[jdx])}
							`;
                    }
                  })}`;
                })}
					`;
              }
            })}` : `${validate_component(LineItem, "LineItem").$$render($$result, {}, {}, {
              default: () => {
                return `${each("".padEnd(WORD_LENGTH), (char, jdx) => {
                  return `${validate_component(CharItem, "CharItem").$$render($$result, { charState: null }, {}, {
                    default: () => {
                      return `${escape(idx === currentGuessIndex && currentGuessChars[jdx] ? currentGuessChars[jdx] : "")}`;
                    }
                  })}`;
                })}
					`;
              }
            })}`}`;
          })}` : ``}
	`;
        }(__value);
      }(secretWordStart)}
	${winner ? `<h3 class="${"svelte-t8xzrw"}">YOU WON!</h3>
		<h3 class="${"svelte-t8xzrw"}">${escape(secretWord)}</h3>` : ``}`;
    }
  })}`;
});
export {
  Page as default
};
