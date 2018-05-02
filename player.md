---
layout: page
title: Player
permalink: /player/
---

<h2>Players</h2>

{% for player in site.data.players %}
・<a href="{{ site.url }}/player/{{ player.link }}">{{ player.name }}</a>
{% endfor %}
