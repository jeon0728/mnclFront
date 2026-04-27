<template>
  <component :is="layout">
    <div style="max-width: 600px; margin: 80px auto;">
      <div>
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.7075 10.5435L19.7075 3.54348C19.6146 3.45064 19.5042 3.37703 19.3829 3.32684C19.2615 3.27665 19.1314 3.25087 19 3.25098H7C6.46957 3.25098 5.96086 3.46169 5.58579 3.83676C5.21071 4.21184 5 4.72054 5 5.25098V27.251C5 27.7814 5.21071 28.2901 5.58579 28.6652C5.96086 29.0403 6.46957 29.251 7 29.251H25C25.5304 29.251 26.0391 29.0403 26.4142 28.6652C26.7893 28.2901 27 27.7814 27 27.251V11.251C27.0001 11.1196 26.9743 10.9895 26.9241 10.8681C26.8739 10.7467 26.8003 10.6364 26.7075 10.5435ZM20 6.66473L23.5863 10.251H20V6.66473ZM25 27.251H7V5.25098H18V11.251C18 11.5162 18.1054 11.7705 18.2929 11.9581C18.4804 12.1456 18.7348 12.251 19 12.251H25V27.251Z" fill="#636363"/>
          <path d="M11.5 16.251C12.3284 16.251 13 15.5794 13 14.751C13 13.9225 12.3284 13.251 11.5 13.251C10.6716 13.251 10 13.9225 10 14.751C10 15.5794 10.6716 16.251 11.5 16.251Z" fill="#636363"/>
          <path d="M20.5 16.251C21.3284 16.251 22 15.5794 22 14.751C22 13.9225 21.3284 13.251 20.5 13.251C19.6716 13.251 19 13.9225 19 14.751C19 15.5794 19.6716 16.251 20.5 16.251Z" fill="#636363"/>
          <path d="M21 23.251C19.9625 21.4572 18.2213 20.251 16 20.251C13.7787 20.251 12.0375 21.4572 11 23.251" stroke="#636363" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 style="margin-top: 4px; margin-bottom: 8px; color:#484848; font-size: 28px;">Page Error</h1>
      <p style="margin-top: 8px; color: #808080; margin-top: 8px;">code : {{ error?.statusCode }}</p>
      <NuxtLink
        to="/" 
        style="margin-top: 24px; display: flex; width: 170px; height: 50px; padding: 2px 8px; justify-content: center; align-items: center; border-radius: 4px; border: 1px solid #1976D2; background: #1976D2; color: #ffffff;"
      >
        Go back home
      </NuxtLink>
    </div>
  </component>
</template>

<script setup lang="ts">

  useHead( {
    title: 'Error Page',
  } )

  const error = useError()

  const layout = computed( () => resolveComponent( 'MainLayout' ) )
</script>
