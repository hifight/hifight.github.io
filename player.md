---
layout: page
title: Player
permalink: /player/
---

<h2>Players</h2>

<div class="list-group">
	{% for player in site.data.players %}
		<div class="list-group-item">
			<div class="row-action-primary">
				{% if player.link %}
					<a href="{{ site.url }}/player/{{ player.link }}"> 
						<img class="row-picture" src="/static/img/player/{{ player.link }}.jpg">
					</a>
				{% endif %}
			</div>
			<div class="row-content">
				<div class="least-content">{{ player.hifight }}</div>
				<h4 class="list-group-item-heading"><a href="{{ site.url }}/player/{{ player.link }}">{{ player.name }}</a></h4>

				<p class="list-group-item-text">{{ player.content | strip_html | truncatewords: 25 }}</p>
			</div>
		</div>
		<div class="list-group-separator"></div>
	{% endfor %}
</div>
	