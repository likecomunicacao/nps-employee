<template>
    <div>
      <b-card no-body bg-variant="transparent" class="bcard mb-2" style="max-width: 20rem;">
        <img v-if="employee.picture"
          :src="employee.picture.large"
          class="card-img card-img-top img-fluid" />
        <b-card-body
          :title="employee.name.first + ' ' + employee.name.last"
          :sub-title="employee.email">
          <p class="card-text">
            <slot name="employee-test"></slot>
          </p>
          <hr>
          <router-link tag="b-button"
            :to="{ name: 'detalhes', params: { userId: employee.id }}">
              Detalhes
            </router-link>
        </b-card-body>
      </b-card>
    </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    employee: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      msg: '',
    };
  },
};
</script>
