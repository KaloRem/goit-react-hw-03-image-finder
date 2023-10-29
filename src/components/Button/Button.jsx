import React from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Button = ({ page, per_page, totalHits, handleOnClick }) => {
  const handleOnClickButton = () => {
    const howPage = Math.ceil(totalHits / per_page);
    console.log(howPage);
    if (page > howPage) {
      Notify.warning(
        "End of search results."
      );
      return;
    }
    else {
      page += 1;
      handleOnClick(page);
      return;
    }
  };

  return (
    <section>
      <button onClick={handleOnClickButton}>
        Load more
      </button>
    </section>
  );
};

export default Button;