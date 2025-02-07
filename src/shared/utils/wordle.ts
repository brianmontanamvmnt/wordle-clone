import { NUMBER_OF_GUESSES, WORD_LENGTH } from "src/shared/constants/wordle";
import { currentGuessStore, guessesStore, wonGameStore } from 'src/stores/wordle';

export const getSecretWord: (words: string[]) => string = (words) => {
    return words[Math.floor(Math.random() * words.length)].toLowerCase();
}

export const verifySecretWord: (guess: string, secretWord: string) => number[] = (guess, secretWord) => {
    const secretWordMap: { [k: string]: number } = {};
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

    if(count >= 5) {
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
}

const getIsLetter = (event: KeyboardEvent): boolean => {
    const charCode = event.key.toLowerCase().charCodeAt(0);
    return event.key.length === 1 &&
        charCode >= 'a'.charCodeAt(0) &&
        charCode <= 'z'.charCodeAt(0);
}

export const characterKeyPress: (event: KeyboardEvent, guesses: string[], secretWord: string) => void = (event, guesses, secretWord) => {
    if (guesses[NUMBER_OF_GUESSES - 1] !== null || guesses.includes(secretWord)) {
        return;
    }

    currentGuessStore.update(prevGuess => {
        return setCurrentGuess(event, prevGuess, guesses);
    }) 
}

export const setCurrentGuess: (event: KeyboardEvent, prevGuess: string, guesses: string[]) => string = (event, prevGuess, guesses) => {
    const isLetter = getIsLetter(event);
    if (event.key === 'Backspace') return prevGuess.slice(0, -1);
    if (event.key === 'Enter' && prevGuess.length === WORD_LENGTH) {
        const currentGuessIndex = guesses.findIndex(guess => guess === null);
        const guessesClone = [...guesses];
        guessesClone[currentGuessIndex] = prevGuess;
        guessesStore.update(() => guessesClone);
        return '';
    }
    if (prevGuess.length < WORD_LENGTH && isLetter) {
        return prevGuess + event.key.toLowerCase();
    }
    return prevGuess;
}