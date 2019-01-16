import axios from 'axios';

function ajaxHeart(e) {
    e.preventDefault();
    console.log(this.action);
    axios
        .post(this.action)
        .then(response => {
            const isHearted = this.heart.classList.toggle('heart__button--hearted');
            console.log(isHearted);
        })
        .catch(err => console.error(err));
}

export default ajaxHeart;