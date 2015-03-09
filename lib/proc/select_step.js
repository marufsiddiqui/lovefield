/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
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
goog.provide('lf.proc.SelectStep');

goog.require('lf.proc.PhysicalQueryPlanNode');



/**
 * @constructor @struct
 * @extends {lf.proc.PhysicalQueryPlanNode}
 *
 * @param {!lf.Predicate} predicate
 */
lf.proc.SelectStep = function(predicate) {
  lf.proc.SelectStep.base(this, 'constructor');

  /** @type {lf.Predicate} */
  this.predicate = predicate;
};
goog.inherits(lf.proc.SelectStep, lf.proc.PhysicalQueryPlanNode);


/** @override */
lf.proc.SelectStep.prototype.toString = function() {
  return 'select(' + this.predicate.toString() + ')';
};


/** @override */
lf.proc.SelectStep.prototype.exec = function(journal) {
  return this.getChildAt(0).exec(journal).then(goog.bind(
      /**
       * @param {!lf.proc.Relation} relation
       * @this {lf.proc.SelectStep}
       */
      function(relation) {
        return this.predicate.eval(relation);
      }, this));
};