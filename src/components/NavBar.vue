<template>
  <header>
	<!--- Navbar --->
	<nav class="navbar navbar-expand-lg">
		<div class="container">
			<a class="navbar-brand text-white" href="#"><i class="glyphicon glyphicon-music"></i>INFORMAZIONI UTENTE</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
				<span class="navbar-toggler-icon"></span>
			</button>
			
		</div>
	</nav>
	<!--# Navbar #-->
	</header>
    </template>

<script>

export default {
  name: 'NavBar',
  props: {
    msg: String  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar { background-color: #484848; margin-bottom: 2rem; }
.navbar .navbar-nav .nav-link { color: #fff; }
.navbar .navbar-nav .nav-link:hover { color: #fbc531; }
.navbar .navbar-nav .active > .nav-link { color: #fbc531; }

</style>
