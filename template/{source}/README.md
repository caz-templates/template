# <%= '\<%= name %\>' %><% if (features.includes('prompts')) { %>

> <%= '\<%= description %\>' %>

- version: <%= '\<%= version %\>' %>
- author: <%= '\<%= author %\>' %>
- email: <%= '\<%= email %\>' %>
- url: <%= '\<%= url %\>' %>
- github: <%= '\<%= github %\>' %>
- features: <%= '\<%= features %\>' %>
- year: <%= '\<%= year %\>' %>
- upper: <%= '\<%= _.toUpper(name) %\>' %><% } %>
