<script setup>
const props = defineProps(
    {
        product: {
            type: Object
        },
    }
)
</script>


<template>
    <dialog class="modal" id="my_modal_2">
        <form method="dialog" class="modal-box">
            <div class="modal-header">
                
            </div>
            <!-- <div class="modal-body">
                <p>{{ product.description }}</p>
                <p>Price: ${{ product.price }}</p>
            </div>
            <div class="modal-action">
                <button class="btn" @click="closeModal">Close</button>
            </div> -->
        </form>
    </dialog>
</template>
  