#!/usr/bin/env bash

# Bash completion script for react-native-cli
# Copyright (C) 2018 Sergey Tsapenko - All Rights Reserved
# Permission to copy and modify is granted under the MIT license

if type complete &>/dev/null; then
  _rnc_completion () {
    local cur opts
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    opts=`react-native --help | awk 'BEGIN{RS="\n?Commands:"} (NR-1){print $0}' | awk -F' ' '{ print $1 }' | sed '/^$/d' | paste -sd " " -`

    COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
    return 0
  }
  complete -F _rnc_completion react-native
fi
