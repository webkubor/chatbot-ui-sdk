#!/usr/bin/env bash
set -euo pipefail

# Purge jsDelivr cache for @latest (or version-aliased) URLs.
# Usage:
#   scripts/purge-jsdelivr.sh
#   scripts/purge-jsdelivr.sh https://cdn.jsdelivr.net/npm/paylinker-chatbot-sdk@latest/dist/chatbot-sdk.umd.js
#   scripts/purge-jsdelivr.sh npm/paylinker-chatbot-sdk@latest/dist/chatbot-sdk.umd.js

BASE="https://purge.jsdelivr.net"

default_targets=(
  "npm/paylinker-chatbot-sdk@latest/dist/chatbot-sdk.umd.js"
  "npm/paylinker-chatbot-sdk@latest/dist/style.css"
  "npm/paylinker-chatbot-sdk@latest/dist/index.html"
)

targets=("$@")
if [ ${#targets[@]} -eq 0 ]; then
  targets=("${default_targets[@]}")
fi

for t in "${targets[@]}"; do
  if [[ "$t" == https://cdn.jsdelivr.net/* ]]; then
    purge_url="${t/https:\/\/cdn.jsdelivr.net/https:\/\/purge.jsdelivr.net}"
  elif [[ "$t" == https://purge.jsdelivr.net/* ]]; then
    purge_url="$t"
  elif [[ "$t" == http*://* ]]; then
    echo "Unsupported URL: $t" >&2
    echo "Use a cdn.jsdelivr.net URL or a jsDelivr path like npm/<pkg>@latest/<file>" >&2
    exit 1
  else
    purge_url="${BASE}/${t}"
  fi

  echo "Purging: $purge_url"
  curl -fsS "$purge_url" >/dev/null
done

echo "Done."
