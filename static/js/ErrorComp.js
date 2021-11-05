const error = {
    data(){
        return {
          text: '',
        }
    },
    computed: {
      isVisible(){
          return this.text === ''
      }
    },
    methods: {
      insertErrorMsg(){
        document.querySelector('.error-msg').textContent = this.text;
      }
    },
    template: `
              <div class="error-block" v-if="!isVisible">
                <button class="afas" @click="insertErrorMsg">>></button>
                <span class="error-msg">Возникла ошибка...</span>
                <button class="close-btn" @click="text=''">&times;</button>
              </div>
              `
};