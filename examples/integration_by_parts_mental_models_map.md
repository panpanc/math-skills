### Section 1 - Topic Snapshot

- **Target:** `integration by parts`
- **Requested models:** `default`
- **Final model count:** `12`
- **Summary:** Integration by parts turns the product rule around: instead of differentiating a product to expand it, you integrate a product and strategically move the derivative from one factor to the other. Its dominant reasoning style is redistribution of difficulty, where you decide which factor should become simpler under differentiation and which one is tolerable to integrate. The formula $\int u\,dv = uv - \int v\,du$ is therefore less a memorized trick than a reusable method for reassigning complexity, exposing boundary structure, and building reduction relations.

### Section 2 - Mental Models Catalog

### Model #1 - Run the Product Rule Backward

- **Compressed model:** When a forward rule creates a sum from a product, the backward move can compress a product into a boundary term plus a correction term. Integration by parts is the backward version of the product rule.
- **How it appears in integration by parts:** The identity comes directly from rearranging $(uv)' = u'v + uv'$. You recognize a product inside an integral and ask what differentiated product could have produced it.
- **Boundary / failure mode:** This misleads if you use it as pattern-matching without checking that one factor is better to differentiate and the other is actually integrable.
- **Other concepts/theorems using this model (5):**
1. `partial fractions` - A product or ratio is decomposed into simpler pieces by reversing the way fractions combine.
2. `telescoping series` - A complicated sum is recognized as the backward form of repeated cancellation between neighboring terms.
3. `finite difference summation by parts` - The discrete product rule is run backward to move difference operators between factors.
4. `integration by substitution` - The chain rule is reversed so a composite expression is compressed into a simpler variable change.
5. `divergence theorem` - A local differentiation identity is run backward into a boundary term plus an interior interpretation.
- **Transfer takeaway:** When a forward rule expands structure, ask whether the inverse viewpoint can compress the expression into something easier to control.

### Model #2 - Move the Derivative to the Better Home

- **Compressed model:** A derivative is not sacredly attached to the factor it currently sits on; you can relocate it if the new location simplifies the problem. Good use of integration by parts is really good derivative placement.
- **How it appears in integration by parts:** You choose $u$ to be the factor that becomes simpler under differentiation and $dv$ to be the factor that remains manageable after integration. The whole method is a controlled transfer of roughness or complexity.
- **Boundary / failure mode:** It fails when both choices get worse, so "move the derivative" must be guided by simplification rather than by habit.
- **Other concepts/theorems using this model (5):**
1. `weak derivative` - Differentiation is shifted from a rough function onto a smooth test function so the expression still makes sense.
2. `Green's first identity` - Derivatives are transferred between factors inside an $L^2$ pairing to reveal energy structure.
3. `adjoint operator` - A linear operator is moved across an inner product to the slot where it is more useful to analyze.
4. `Sturm-Liouville theory` - Differential expressions are organized so derivatives land where self-adjoint structure becomes visible.
5. `Fourier transform of a derivative` - Differentiation in physical space is moved into multiplication in frequency space where it is easier to track.
- **Transfer takeaway:** If one part of an expression is hard to differentiate or estimate, look for a lawful way to move the derivative elsewhere.

### Model #3 - Differentiate the Complicated, Integrate the Stable

- **Compressed model:** Complexity often shrinks faster under differentiation than under integration. A good split chooses the factor whose derivatives simplify and pairs it with one whose antiderivative stays controlled.
- **How it appears in integration by parts:** Logarithms, inverse trig functions, and polynomials are often chosen as $u$ because differentiation simplifies them, while exponentials or sines and cosines are often chosen as $dv$ because integrating them preserves form. The method works by exploiting asymmetry between the two operations.
- **Boundary / failure mode:** This heuristic can backfire when the antiderivative of the "stable" factor introduces something worse, such as non-elementary terms or large growth.
- **Other concepts/theorems using this model (5):**
1. `Laplace's method` - Rapidly varying exponentials are left in a stable form while the slowly varying factor is expanded or differentiated conceptually.
2. `variation of parameters` - Known homogeneous solutions are preserved while the harder forcing term is absorbed into simpler derivative relations.
3. `Leibniz rule for repeated derivatives` - The factor with quickly vanishing higher derivatives is singled out to keep the expansion short.
4. `method of annihilators` - The forcing term is differentiated until it collapses into a simpler algebraic family.
5. `Hermite reduction` - Rational-algebraic complexity is reduced by differentiating the right algebraic pieces while preserving an integrable remainder.
- **Transfer takeaway:** Separate the expression into the part that collapses under differentiation and the part that survives integration gracefully.

### Model #4 - Pay with a Boundary Term

- **Compressed model:** Moving a derivative is never free; the price is a boundary contribution. Many deep uses of integration by parts come from understanding when that price vanishes, helps, or causes trouble.
- **How it appears in integration by parts:** The term $uv$ evaluated at the endpoints records what is lost or gained when the derivative changes owners. In definite integrals, the real question is often whether this boundary term disappears or encodes essential data.
- **Boundary / failure mode:** This model fails if you casually drop endpoint terms in improper integrals or PDE settings where they are exactly the main contribution.
- **Other concepts/theorems using this model (5):**
1. `fundamental theorem of calculus` - Accumulated change becomes endpoint data, so the boundary term is the whole story.
2. `Green's theorem` - Interior derivative information is exchanged for circulation or flux along the boundary.
3. `Stokes' theorem` - A local differential relation is paid for by an integral over the boundary of the region.
4. `Noether's theorem with boundary terms` - Conserved quantities depend on tracking which total derivative terms survive at the boundary.
5. `Euler-Lagrange equations` - The natural boundary conditions appear precisely because integration by parts produces endpoint terms in the variation.
- **Transfer takeaway:** Every time you relocate a derivative, immediately ask what boundary term you just created and whether it matters.

### Model #5 - Build a Reduction Ladder

- **Compressed model:** A hard object becomes manageable if each application of a rule lowers a measurable notion of complexity. Integration by parts often creates a recurrence that walks the problem down one rung at a time.
- **How it appears in integration by parts:** Integrals such as $\int x^n e^x\,dx$ or $\int x^n \sin x\,dx$ become simpler after each round because the polynomial degree drops. The method is effective when repeated use provably terminates or cycles in a solvable way.
- **Boundary / failure mode:** Repetition is wasteful if no complexity measure decreases, or if the recurrence closes in a way you do not recognize.
- **Other concepts/theorems using this model (5):**
1. `reduction formula for sine powers` - Each step lowers the exponent and reduces the integral to a simpler case.
2. `Euclidean algorithm` - Repeated division lowers size until the problem reaches a terminal base case.
3. `integration by partial fractions recurrence` - Algebraic decomposition reduces denominator complexity step by step.
4. `Gram-Schmidt process` - A vector family is simplified one stage at a time by peeling off directions already understood.
5. `dynamic programming` - A difficult problem is solved by reducing it to smaller subproblems linked by a recurrence.
- **Transfer takeaway:** Look for a monotone complexity measure; if each application lowers it, the rule is probably worth iterating.

### Model #6 - Close the Loop and Solve for the Unknown

- **Compressed model:** Sometimes a transformation brings back the original unknown, but in a simpler algebraic position. Then the right move is not to keep transforming but to isolate the repeated quantity and solve.
- **How it appears in integration by parts:** For $\int e^x \sin x\,dx$ or $\int e^x \cos x\,dx$, repeated integration by parts returns the original integral. The trick is to notice the loop and solve an algebraic equation for the integral.
- **Boundary / failure mode:** This model misfires if you fail to detect the recurrence exactly and instead generate an endless chain of nearly identical expressions.
- **Other concepts/theorems using this model (5):**
1. `geometric series formula` - Reindexing reproduces the original series, after which algebra isolates the sum.
2. `Banach fixed-point theorem` - Repeated application returns you near the same object, allowing self-consistency to identify the solution.
3. `resolvent identity` - The unknown operator expression reappears in a way that can be rearranged and solved.
4. `method of undetermined coefficients` - The guessed family is closed under differentiation, so coefficients are solved algebraically after substitution.
5. `generating function for Fibonacci numbers` - The shifted series recreates itself, and the recurrence becomes an algebraic equation in the generating function.
- **Transfer takeaway:** If the process brings the original unknown back, stop iterating and solve the self-reference directly.

### Model #7 - Create Cancellation on Purpose

- **Compressed model:** A useful transformation is one that makes the new term smaller, opposite in sign, or more oscillatory-canceling than the old one. Integration by parts is often chosen because it manufactures cancellation rather than because it explicitly computes an antiderivative.
- **How it appears in integration by parts:** In oscillatory integrals, differentiating the slowly varying amplitude and integrating the oscillation produces factors that shrink the result or reveal cancellation. The new integral is valuable because it is less dangerous, not because it is prettier.
- **Boundary / failure mode:** This becomes misleading if the supposedly oscillatory or canceling factor does not actually produce decay after integration.
- **Other concepts/theorems using this model (5):**
1. `Dirichlet test` - Partial cancellation from oscillation or sign change controls sums that do not converge absolutely.
2. `Riemann-Lebesgue lemma` - Oscillation forces Fourier coefficients to vanish because integration by parts or related cancellation mechanisms weaken the integral.
3. `stationary phase method` - Nonstationary oscillation is exploited to create cancellation away from critical points.
4. `Abel summation` - Rearranging a sum isolates the oscillatory or canceling component from the slowly varying one.
5. `van der Corput lemma` - Repeated oscillatory cancellation bounds an integral even when direct absolute-value estimates fail.
- **Transfer takeaway:** If direct estimation is too crude, transform the expression so oscillation or sign structure does the work for you.

### Model #8 - Read Moments as Differentiated Weights

- **Compressed model:** Polynomial factors often signal that you should differentiate the non-polynomial part or its parameter dependence. Integration by parts reveals that powers of $x$ can be traded against derivatives or recurrences in the accompanying weight.
- **How it appears in integration by parts:** Integrals like $\int x^n e^{-x}\,dx$ or $\int x^n \cos x\,dx$ are manageable because the polynomial factor is consumed one derivative at a time. The polynomial is best viewed as a moment that can be traded away.
- **Boundary / failure mode:** This model is less helpful when the weight does not stay in a controlled family under differentiation or integration.
- **Other concepts/theorems using this model (5):**
1. `gamma function recursion` - The factor $x^s$ is traded against differentiation structure to produce $\Gamma(s+1) = s\Gamma(s)$.
2. `moment generating function` - Moments are recovered by differentiating a weighted exponential family with respect to its parameter.
3. `Hermite polynomial identities` - Polynomial moments are encoded through derivatives of Gaussian weights.
4. `Legendre polynomial orthogonality formulas` - Powers and derivatives interact so weighted moments can be reorganized into orthogonality statements.
5. `Laplace transform moment formulas` - Moments appear as derivatives of the transform at the origin or through repeated parameter differentiation.
- **Transfer takeaway:** When you see a polynomial multiplier, ask whether it is really a disguised derivative count or moment parameter.

### Model #9 - Trade Exact Evaluation for Better Estimates

- **Compressed model:** A transformation can be worthwhile even if it does not produce a closed form, because it may place the problem in a form that is easier to bound. Integration by parts is as much an estimation tool as a computation tool.
- **How it appears in integration by parts:** Analysts use it to prove decay of Fourier transforms, bounds on oscillatory integrals, and control of error terms. The value lies in producing smaller or more structured remainders rather than exact antiderivatives.
- **Boundary / failure mode:** It is not useful if the transformed remainder is no easier to estimate than the original integral.
- **Other concepts/theorems using this model (5):**
1. `energy estimate for the heat equation` - Rearrangement is used to obtain coercive bounds rather than explicit solutions.
2. `Cauchy-Schwarz inequality` - One transforms a product into square norms because those are easier to estimate sharply.
3. `Young's inequality` - A difficult cross term is traded for separate powers that are more controllable.
4. `Chebyshev's inequality` - Exact distribution information is replaced by a coarse but useful tail estimate.
5. `Sobolev inequality` - Differential information is traded for norm control, favoring useful estimates over exact formulas.
- **Transfer takeaway:** Ask not only "can this compute the answer?" but also "does this produce a form I can estimate effectively?"

### Model #10 - Choose Roles Strategically, Not Symmetrically

- **Compressed model:** The two factors in a product may look equally important, but the method is asymmetric and your choice of roles matters. Good problem solving starts by deciding which part should be treated as structure and which part as transport.
- **How it appears in integration by parts:** Picking $u$ and $dv$ is the core strategic decision, because the same integral can become easier or worse depending on the assignment. Rules like LIATE are crude reminders of this asymmetry, not universal laws.
- **Boundary / failure mode:** The model breaks if you overfit a mnemonic and ignore the actual behavior of derivatives, antiderivatives, and endpoints.
- **Other concepts/theorems using this model (5):**
1. `substitution method` - The correct inner expression to replace is chosen strategically, not by superficial appearance.
2. `Lagrange multipliers` - You decide which variables are primal constraints and which are shadow-price responses, and the formulation depends on that choice.
3. `Fubini's theorem in practice` - The order of integration is chosen for convenience even though the integral represents the same quantity.
4. `change of basis` - The right coordinates are selected to make one part of the structure simple while leaving the rest manageable.
5. `variation of constants` - The unknown piece is assigned to the coefficient that can absorb the forcing most effectively.
- **Transfer takeaway:** Equivalent representations are not equally useful; choose the role assignment that exposes the simplest downstream behavior.

### Model #11 - Local Derivative Data Becomes Global Accumulation Data

- **Compressed model:** Differentiation speaks locally while integration accumulates globally. Integration by parts translates information about local rates of change in one factor into global information about the whole product.
- **How it appears in integration by parts:** The derivative on $u$ captures local simplification, but after the transfer the integral records the accumulated effect of that local change against $v$. The method is a bridge between pointwise derivative structure and integral-scale behavior.
- **Boundary / failure mode:** This intuition becomes vague if you do not keep track of the actual domains, endpoint behavior, and regularity assumptions needed for the translation.
- **Other concepts/theorems using this model (5):**
1. `fundamental theorem of calculus` - Local derivative information integrates up to global endpoint change.
2. `Taylor's theorem with remainder` - Local derivative data is accumulated to control a global approximation error.
3. `Gronwall's inequality` - A local differential inequality is integrated into a global growth bound.
4. `mean value theorem for integrals` - Average global behavior is extracted from local continuity information.
5. `Duhamel's principle` - Local forcing is accumulated over time into a global solution formula.
- **Transfer takeaway:** When local rate information is available but the question is global, look for a mechanism that accumulates the local effect across the domain.

### Model #12 - Make an Implicit Adjoint Visible

- **Compressed model:** Integration by parts often reveals that differentiation has a partner operation obtained by moving it across an integral pairing. What looks like a calculus trick is frequently the visible face of adjoint structure.
- **How it appears in integration by parts:** In $L^2$ settings, the derivative acting on one factor can be transferred to the other factor with a sign change and a boundary term. This is the prototype for identifying formal adjoints of differential operators.
- **Boundary / failure mode:** It is misleading to speak of adjoints without specifying the function space, domain, and boundary conditions that make the operator statement true.
- **Other concepts/theorems using this model (5):**
1. `formal adjoint of a differential operator` - Integration by parts is the mechanism that identifies the operator that acts on test functions on the opposite side.
2. `self-adjoint boundary value problem` - Boundary conditions are chosen so the transferred operator matches the original one.
3. `weak formulation of Poisson's equation` - Derivatives are shifted onto test functions so rough solutions can be defined through pairings.
4. `Hilbert space projection theorem` - Orthogonality conditions are expressed through pairings that often arise after an adjoint transfer.
5. `least-squares normal equations` - The transpose or adjoint appears by moving a linear map across the pairing defining the residual orthogonality condition.
- **Transfer takeaway:** If a derivative is being moved inside an integral, you are often seeing the concrete shadow of an adjoint operator.

### Section 3 - Reusable Playbook

- Start by asking which factor becomes simpler under differentiation and which survives integration without damage.
- Treat the boundary term as part of the answer immediately; do not decide later whether it matters.
- If repeated application lowers a clear complexity measure, keep going and build a reduction formula.
- If the original integral reappears after a few steps, solve the resulting algebraic recurrence instead of continuing mechanically.
- Use integration by parts for estimation whenever oscillation, decay, or orthogonality is more important than closed-form evaluation.
- Interpret polynomial factors as signals that a recurrence, moment identity, or parameter derivative may be hiding nearby.
- When working in function spaces, translate the calculation into "move the derivative across the pairing" and inspect the adjoint and boundary conditions.
