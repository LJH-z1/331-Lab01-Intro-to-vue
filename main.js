const { createApp, ref, computed, reactive, toRefs } = Vue;

const app = createApp({
  setup() {
    const cart = ref([]);
    const premium = ref(true);
    
    function updateCart(id) {
      cart.value.push(id);
    }
    
    function removeFromCart(id) {
      const index = cart.value.indexOf(id);
      if (index > -1) {
        cart.value.splice(index, 1);
      }
    }
    
    const cartItems = computed(() => {
      const items = {};
      cart.value.forEach(id => {
        items[id] = (items[id] || 0) + 1;
      });
      return items;
    });
    
    const totalItems = computed(() => cart.value.length);
    
    return {
      cart,
      premium,
      updateCart,
      removeFromCart,
      cartItems,
      totalItems
    }
  }
});


app.component('product-details', productDetails);
app.component('review-form', reviewForm);
app.component('review-list', reviewList);
app.component('product-display', productDisplay);

app.mount('#app');