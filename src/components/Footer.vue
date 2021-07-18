<template>
    <footer>
		<div class="jumbotron jumbotron-fluid bg-secondary p-4 mt-5 mb-0">
			<div class="container">
				<div class="row">
					<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 cizgi">
						<div class=" bg-secondary border-0">
							<div class=" text-light text-center">
								<h5 class=" text-white display-4" style="font-size:30px">Alessandro Perrone</h5>
							<p class="d-inline lead">s0ulr4v3n_ © 2021<br>
							<a href="#" class="text-light d-block lead">PDF Generator</a>
							</p>
	
							</div>
						</div>
					</div>
					
					<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
						<div class="bg-secondary border-0">
							<div class=" text-center">
							<h5 class="text-white display-4" style="font-size:30px">Let's create your pdf</h5>
					
									<a class="text-light" href="#"><i class="fa fa-facebook-square fa-fw fa-2x"></i></a>
    
									<a class="text-light" href="#"><i class="fa fa-twitter-square fa-fw fa-2x"></i></a>
								
									<a class="text-light" href="#"><i class="fa fa-instagram fa-fw fa-2x"></i></a>
								
									<a class="text-light" href="#"><i class="fa fa-linkedin fa-fw fa-2x"></i></a>
								
							</div>
						</div>
					</div>	
				</div>
			</div>
		</div>
	</footer>
</template>
<script>

export default {
  name: 'Footer',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
    position:fixed;
   left:0px;
   bottom:0px;
   width:100%;
}
footer a.text-light:hover { color: #fed136!important; text-decoration: none; }
footer .cizgi { border-right: 1px solid #535e67; }
@media (max-width: 992px) { footer .cizgi { border-right: none; } }
</style>
