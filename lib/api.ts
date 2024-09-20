interface Prompt {
  text: string
}

export const getPrompt = (): Promise<Prompt[]> => {
  return fetch('')
    .then(res => res.json())
    .then(res => {
      return res as Prompt[];
    });
};
