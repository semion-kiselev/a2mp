import LoadGoogleMapsApiOprions from '../interfaces/LoadGoogleMapsApiOptions';

export default ({
  client,
  key,
  language
}: LoadGoogleMapsApiOprions) => {

  const callbackName = '__googleMapsApiOnLoadCallback';

  return new Promise((resolve, reject) => {

    const scriptElement = document.createElement('script');

    const params: string[] = [`callback=${callbackName}`];
    if (client) params.push(`client=${client}`);
    if (key) params.unshift(`key=${key}`);
    if (language) params.push(`language=${language}`);

    scriptElement.src = `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;
console.log(scriptElement.src);
    window[callbackName] = () => {
      resolve(window['google'].maps);
      delete window[callbackName];
    };

    document.body.appendChild(scriptElement);
  });
};