<div class="edgeTile">

	<div class="edgeTileImage">
		<img src="{#PX#}" id="adminLogOutId" onload="$SR.loadImage('adminLogOutId', document, 'images/lock_closed.png', -1);">
	</div>

	<div class="edgeTileInfo">
		<div class="edgeTileInfoTitle spacer">{#adminlogout#}</div>

		<input class="edgeInput spacer" type="password"/>

		<a href="#" class="edgeButtonLink" onclick="return spaceify.adminLogOut();">
			<div class="edgeButton" style="width: 124px;">
				{#logout#}
			</div>
		</a>

	</div>

</div>
