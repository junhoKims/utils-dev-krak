IGNORE_PATTERNS=("feat/" "feature/" "fix/" "chore/" "refactor/" "style/" "docs/" "test/")

for pattern in "${IGNORE_PATTERNS[@]}"; do
  if [[ "$VERCEL_GIT_COMMIT_REF" == $pattern* ]]; then
    echo "🛑 - Build Skip for branch $VERCEL_GIT_COMMIT_REF due to pattern match: '$pattern'"
    exit 0
  fi
done

npx turbo-ignore --fallback=HEAD^1