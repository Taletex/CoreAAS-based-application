TODO

Procedura per far partire il server.
Col terminale spostarsi dentro aas_server e digitare i comandi:
1. npm install node-opcua-coreaas --save 

Citare che il server è stat fatto a partire dalla repo di OPCUA-CoreAAS a cui abbiamo aggiunto diverse cose (tra cui l'address space popolato, implementazione di template, mapping di Operation e RelationshipElement, library per l'instanziazione rapida di elementi dell'address space)


TODO: cambiare il package.json

DIPENDENZE:
1. NodeJS
2. Typescript
3. "npm install -g http-server@0.9.0"     e    per partire il server → nella folder del server (webapp) digitare in terminale "http-server -o -a 127.0.0.1"


REG EXPR per refactor di func per la concept description da Typescript a Javascript: server, conceptDictionary, ([\[])([_a-zA-Z0-9, ])*([\]])([,])([ ])
REG EXPR per refactor di func per i nomi delle const da Typescript a Javascript: const ([a-zA-Z0-9_])*([ = ])*