export interface Tableau {
   document: Document;
}

export interface Document {
   letter_pair: string;
   starter_sentence: string;
   images: Images;
   elaboration: Elaboration;
   group?: [string];
   comments?: [string];
   word_resources?: WordResources;
   memory_tags: MemoryTags;
}

export interface Images {
   person: string;
   verb?: string;
   object?: string;
   supplemental?: string;
}

export interface Elaboration {
   pronunciation?: string;
   synopsis: string;
   hybrid_definition?: string;
   backstory: Backstory;
}

export interface Backstory {
   story: string;
   length: number;
}

export interface WordResources {
   more_words?: string;
   legacy_sentence?: string;
}

export interface MemoryTags {
   location: string;
   tableau?: string;
}
