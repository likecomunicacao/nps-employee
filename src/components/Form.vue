<template>
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="exampleInputGroup2"
                        label="Comentários:"
                        label-for="exampleInput2">
            <b-form-textarea id="textarea1"
                     v-model="form.text"
                     placeholder="Comentários"
                     :rows="3"
                     :max-rows="6">
            </b-form-textarea>
        </b-form-group>
        <b-form-group id="exampleInputGroup3"
                        label="NPS:"
                        label-for="exampleInput3">
            <b-form-select id="exampleInput3"
                        :options="range"
                        required
                        v-model="form.nps">
            </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Enviar</b-button>
        <b-button type="reset" variant="danger">Limpar</b-button>
      </b-form>
      </br></br>
    </div>
</template>

<script>
export default {
  name: 'Form',
  data () {
    return {
      form: {
        text: '',
        nps: null
      },
      range: [
        { text: 'Selecione um', value: null },
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      this.$store.dispatch('insertNPS', {
        text: this.form.text,
        nps: this.form.nps,
        employeeId: parseInt(this.$route.params.userId),
        date: "2018-05-07",
        name: "João",
        id: Math.floor(Math.random() * 100) + 11 ,
      });
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.text = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<style>
.form-group{
    text-align: left;
}
</style>
