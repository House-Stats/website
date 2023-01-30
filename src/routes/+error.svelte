<script>
    import { page } from '$app/stores';
  </script>
  
<div class="flex h-screen justify-center items-center">
    <div class="text-center">
        <p class="text-2xl">{$page.error.message}</p>
        <p class="text-lg">This site is still under developemnt so some features may be missing</p>
    </div>

</div>
