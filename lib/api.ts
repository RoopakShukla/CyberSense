export const getPrompt = ({text , file}: {text:string , file:[]} ) => {
  return fetch('')
    .then(res => res.json())
    .then(res => {
      return res;
    });
};