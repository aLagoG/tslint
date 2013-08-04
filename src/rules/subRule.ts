/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

/// <reference path='rule.ts'/>
/// <reference path='abstractRule.ts'/>

module Lint.Rules {

    export class SubRule extends AbstractRule {
        public isEnabled() : boolean {
            return this.getValue() === true;
        }

        public apply(syntaxTree: TypeScript.SyntaxTree): RuleFailure[] {
            return this.applyWithWalker(new SubWalker(syntaxTree));
        }
      }

    class SubWalker extends Lint.RuleWalker {
        static SUB_FAILURE = "object access via string literals is disallowed";

        public visitElementAccessExpression(node: TypeScript.ElementAccessExpressionSyntax): void {
            super.visitElementAccessExpression(node);
            this.handleElementAccessExpression(node);
        }

        private handleElementAccessExpression(operatorToken: TypeScript.ElementAccessExpressionSyntax) {
            var argumentExpressionKind = operatorToken.argumentExpression.kind();

            if (argumentExpressionKind === TypeScript.SyntaxKind.StringLiteral) {
                this.addFailure(this.createFailure(this.position(), operatorToken.width(), SubWalker.SUB_FAILURE));
            }
        }
  }

}
