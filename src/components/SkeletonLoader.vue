<template>
    <div class="skeleton-loader">
        <div class="skeleton-image"></div>
        <div class="skeleton-text"></div>
    </div>
</template>
  
<style scoped>
    .skeleton-loader {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }

    .skeleton-image {
        width: 60px;
        height: 60px;
        background-color: #e0e0e0;
        border-radius: 50%;
        margin-right: 10px;
        animation: pulse 1.5s infinite;
    }
  
    .skeleton-text {
        width: 150px;
        height: 20px;
        background-color: #e0e0e0;
        border-radius: 4px;
        animation: pulse 1.5s infinite;
    }
  
    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
</style>