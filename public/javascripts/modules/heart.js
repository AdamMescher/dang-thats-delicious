import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
    e.preventDefault();
    axios
        .post(this.action)
        .then(response => {
            const notHearted = `<button class="heart-button" type="submit" name="heart"><span class="emoji-icon">🖤</span></button>`;
            const hearted = `<button class="heart-button" type="submit" name="heart"><span class="emoji-icon">❤️</span></button>`;
            const isHearted = this.innerHTML.includes('❤️');
            isHearted ? this.innerHTML = notHearted : this.innerHTML = hearted;
            $('.heart-count').textContent = response.data.hearts.length;
        })
        .catch(err => console.error(err));
}

export default ajaxHeart;