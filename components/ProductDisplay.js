const productDisplay = {
  template:
  /*html*/
  `
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image">
      </div>
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      
      <div class="variant-info">
        <p><strong>Selected Variant:</strong> {{ selectedVariantColor }} (ID: {{ selectedVariantId }})</p>
        <p><strong>Stock:</strong> {{ selectedVariantQuantity }} available</p>
      </div>
      
      <p v-if="inventory > 10">In Stock</p>
      <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
      <p v-else>Out of Stock</p>
      
      <p>Shipping: {{ shipping }}</p>
      
      <product-details :details="details"></product-details>
      
      <div class="variants">
        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)"
          class="color-circle" 
          :style="{ backgroundColor: variant.color }"
          :title="variant.color + ' - ' + variant.quantity + ' available'"
          :class="{ 'selected': index === selectedVariant }"
        ></div>
      </div>
      
      <div class="button-group">
        <button 
          class="button" 
          :disabled="!inStock" 
          @click="addToCart" 
          :class="{ disabledButton: !inStock }"
        >
          Add To Cart
        </button>
        
        <button 
          class="button remove-btn" 
          @click="removeFromCart"
        >
          Remove From Cart
        </button>
      </div>
      
      
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>
  </div>
  `,
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const product = Vue.ref('Boots')
    const brand = Vue.ref('SE 331')
    const inventory = Vue.ref(100)
    const details = Vue.ref([
      '50% cotton',
      '30% wool',
      '20% polyester'
    ])
    const variants = Vue.ref([
      { 
        id: 2234, 
        color: 'green', 
        image: './assets/images/socks_green.jpg', 
        quantity: 50 
      },
      { 
        id: 2235, 
        color: 'blue', 
        image: './assets/images/socks_blue.jpg', 
        quantity: 0 
      }
    ])
    const selectedVariant = Vue.ref(0)
    const cart = Vue.ref(0)
    

    const reviews = Vue.ref([])
    
    function updateVariant(index) {
      selectedVariant.value = index;
    }
    
    function addToCart() {
      const variantId = variants.value[selectedVariant.value].id
      emit('add-to-cart', variantId)
    }
    
    function removeFromCart() {
      const variantId = variants.value[selectedVariant.value].id
      emit('remove-from-cart', variantId)
    }
    

    function addReview(review) {
      reviews.value.push(review)
    }
    
    const image = Vue.computed(() => {
      return variants.value[selectedVariant.value].image
    })
    
    const inStock = Vue.computed(() => {
      return variants.value[selectedVariant.value].quantity > 0
    })
    
    const title = Vue.computed(() => {
      return brand.value + ' ' + product.value
    })
    
    const shipping = Vue.computed(() => {
      if (props.premium) {
        return 'Free'
      } else {
        return '30 Baht'
      }
    })
    
    const selectedVariantId = Vue.computed(() => {
      return variants.value[selectedVariant.value].id
    })
    
    const selectedVariantColor = Vue.computed(() => {
      return variants.value[selectedVariant.value].color
    })
    
    const selectedVariantQuantity = Vue.computed(() => {
      return variants.value[selectedVariant.value].quantity
    })
    
    return {
      title,
      image,
      inStock,
      inventory,
      details,
      variants,
      selectedVariant,
      selectedVariantId,
      selectedVariantColor,
      selectedVariantQuantity,
      reviews,
      addToCart,
      removeFromCart,
      updateVariant,
      addReview,
      shipping
    }
  }
}