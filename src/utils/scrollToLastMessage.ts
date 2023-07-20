export const scrollToLastMessage = () => {
  setTimeout(() => {
    const collection = document.getElementsByClassName('chats__dialog');
    if (collection.length) {
      collection[0].scrollTo({
        top: collection[0].scrollHeight,
        behavior: 'smooth',
      });
    }
  }, 200);
};
