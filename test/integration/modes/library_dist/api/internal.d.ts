/// <reference path="external.d.ts" />

declare module internal {
    interface ExtendedTestInterface extends external.TestInterface {
        extra: boolean
    }
}
