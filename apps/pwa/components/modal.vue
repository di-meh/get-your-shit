<script setup>
defineProps(
    {
        title: String,
        description: String
    }
)

</script>


<template>
    <dialog id="my_modal_1" class="modal">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">{{ props.title }}</h3>
            <p class="py-4">{{ props.description }}</p>
            <div class="modal-action">
                <button class="btn">Close</button>
            </div>
        </form>
    </dialog>
</template>