<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    });

    const emit = defineEmits(['updatePage']);

    const prevPage = () => {
    if (props.currentPage > 1) {
        emit('updatePage', props.currentPage - 1);
    }
    };

    const nextPage = () => {
    if (props.currentPage < props.totalPages) {
        emit('updatePage', props.currentPage + 1);
    }
    };
</script>

<template>
    <div class="w-full h-28 flex items-center justify-center gap-5">
        <button @click="prevPage" :disabled="currentPage === 1" class="group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 group-disabled:stroke-gray-200">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <span>Page {{ currentPage }} from {{ totalPages }} </span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 group-disabled:stroke-gray-200">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    </div>
</template>