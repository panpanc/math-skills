# Chapter 6: Functoriality, Invariance, and Bridge to Singular Homology

## Learning objectives
- Define induced maps on homology from simplicial maps.
- Prove functorial laws for identity and composition.
- Explain triangulation invariance and relation to singular homology.

## Prerequisite chapters
- Chapter 1
- Chapter 2
- Chapter 3
- Chapter 4
- Chapter 5

## Chapter target concept/theorem
Homology as a functorial topological invariant and its simplicial-singular correspondence on triangulable spaces.

## 1. Destination and Why It Matters

Chapters 1-5 built definitions, computations, and exact sequences. The final legitimacy question remains: do these groups depend on arbitrary triangulation choices, and how do maps between spaces transport classes?

The destination is a map-aware view: simplicial maps induce homology maps, these maps compose functorially, and resulting homology is invariant under subdivision and compatible with singular homology.

Callback: Chapter 5 exact-sequence maps already hinted that homology must be treated as functorial data, not isolated numbers.

## 2. Foundation Layer

### Primitive 1: Simplicial map
- What it is: A vertex map sending simplices of $K$ to simplices of $L$.
- Why it is load-bearing: Needed to induce chain-level maps.
- Tiny numeric example: Inclusion of a subcomplex is simplicial.
- Failure mode: Vertex map that sends simplex vertices to a non-simplex set in target.

### Primitive 2: Induced chain map
- What it is: $f_\#:C_n(K)\to C_n(L)$ defined on simplices and extended linearly.
- Why it is load-bearing: Homology map is built from this.
- Tiny numeric example: $f_\#([v_0,v_1])=[f(v_0),f(v_1)]$ when nondegenerate.
- Failure mode: Ignoring degeneracy conventions and breaking degree consistency.

### Primitive 3: Chain-map compatibility
- What it is: $\partial f_\#=f_\#\partial$.
- Why it is load-bearing: Ensures cycles map to cycles and boundaries to boundaries.
- Tiny numeric example: For edge, $\partial[f(v_0),f(v_1)]=f(v_1)-f(v_0)=f_\#(v_1-v_0)$.
- Failure mode: Defining $f_\#$ that is linear but not boundary-compatible.

### Primitive 4: Functorial composition law
- What it is: $(g\circ f)_*=g_*\circ f_*$ and $(\mathrm{id})_*=\mathrm{id}$.
- Why it is load-bearing: Homology must transport coherently through map chains.
- Tiny numeric example: Two nested inclusions produce composed inclusion map on homology.
- Failure mode: Computing each induced map in incompatible conventions.

### Primitive 5: Subdivision comparison maps
- What it is: Maps between chain complexes of $K$ and subdivision $\mathrm{Sd}(K)$.
- Why it is load-bearing: Underpins triangulation invariance.
- Tiny numeric example: Barycentric subdivision increases simplex count but preserves $H_1$ of circle.
- Failure mode: Expecting equal matrices instead of induced isomorphism.

### Primitive 6: Singular comparison principle
- What it is: For triangulable spaces, simplicial homology agrees with singular homology.
- Why it is load-bearing: Connects computational model to general topology.
- Tiny numeric example: Triangulated sphere gives $H_2\cong\mathbb{Z}$ in both theories.
- Failure mode: Assuming chain groups are literally identical rather than homology-isomorphic.

## 3. Bottom-Up Thinking Stages

### Stage 1: Lift simplicial maps to chain maps
**Motivation**:
Bottleneck: Classes cannot be compared across spaces without transport maps.
Why-now trigger: Exact-sequence naturality from Chapter 5 demands map-level coherence.
Rejected shortcut: Map homology generators by geometric guesswork.
Stage objective: Define $f_\#$ on chains from simplicial map $f$.
Payoff signal: Every simplicial map has explicit algebraic action.

**Intuition**:
Mental model: Send each simplex to its image simplex, then extend linearly.
Where it fails: Degenerate images require convention handling.

**Construction step**:
Uses: Primitive 1 and Primitive 2.
For $f:K\to L$, define $f_\#$ on oriented simplices and extend linearly to all chains.

**Worked example**:
Example 1
Setup: Inclusion $i:A\hookrightarrow K$.
Compute: $i_\#$ sends each simplex of $A$ to same simplex in $K$.
Interpret: Inclusion gives canonical chain embedding.
Common mistake: Treating inclusion as identity on simplices not in $A$.

Example 2
Setup: Map collapsing two vertices of a path graph.
Compute: Two edges may map to same target edge and coefficients add.
Interpret: Generator count need not be preserved.
Common mistake: Expecting basis cardinality preservation under map.

**What this unlocks next**:
Need boundary compatibility check.
Remaining gap: Must prove $\partial f_\#=f_\#\partial$.

### Stage 2: Prove chain-map compatibility
**Motivation**:
Bottleneck: Without compatibility, induced homology map is undefined.
Why-now trigger: Boundary classes must map into boundary classes.
Rejected shortcut: Assume compatibility from geometric intuition.
Stage objective: Verify $\partial f_\#=f_\#\partial$ on generators.
Payoff signal: Cycle/boundary preservation is guaranteed.

**Intuition**:
Mental model: Image then boundary equals boundary then image because both are facewise operations.
Where it fails: Sloppy orientation handling can fake incompatibility.

**Construction step**:
Uses: Primitive 3 and Chapter 2 boundary formula.
For generator $[v_0,\dots,v_n]$, compare expanded sums term-by-term to show equality.

**Worked example**:
Example 1
Setup: Edge $[v_0,v_1]$.
Compute: $\partial f_\#[v_0,v_1]=f(v_1)-f(v_0)=f_\#(v_1-v_0)=f_\#\partial[v_0,v_1]$.
Interpret: Degree-1 compatibility is explicit.
Common mistake: Forgetting orientation in target edge.

Example 2
Setup: Triangle inclusion map.
Compute: Each face image equals image face, so full alternating sum commutes.
Interpret: Inclusion maps are chain maps naturally.
Common mistake: Checking only one face term.

**What this unlocks next**:
Well-defined induced maps on homology classes.
Remaining gap: Need quotient-level well-definedness argument.

### Stage 3: Define induced homology maps
**Motivation**:
Bottleneck: Chain maps alone are not yet maps on quotients.
Why-now trigger: Need class-level transport $[z]\mapsto ?$.
Rejected shortcut: Map one chosen representative without checking class invariance.
Stage objective: Define $f_*([z])=[f_\#z]$ and prove independence.
Payoff signal: Homology becomes map-aware invariant.

**Intuition**:
Mental model: Boundary adjustments in representatives remain boundary adjustments after $f_\#$.
Where it fails: This depends entirely on Stage 2 compatibility.

**Construction step**:
Uses: Stage 2 and Chapter 3 quotient logic.
If $z'=z+\partial c$, then $f_\#z'=f_\#z+\partial f_\#c$, so classes agree. Hence $f_*$ is well-defined.

**Worked example**:
Example 1
Setup: Inclusion $i:S^1\hookrightarrow D^2$.
Compute: $i_*$ sends generator of $H_1(S^1)$ to $0\in H_1(D^2)$.
Interpret: Boundary loop becomes fillable in larger space.
Common mistake: Assuming inclusion preserves nontriviality.

Example 2
Setup: Identity map on $K$.
Compute: $(\mathrm{id}_K)_*([z])=[z]$ for all classes.
Interpret: Identity acts trivially on homology.
Common mistake: Treating basis change as nontrivial induced map.

**What this unlocks next**:
Global laws for composition and identity.
Remaining gap: Need proof homology is a functor.

### Stage 4: Prove functorial laws
**Motivation**:
Bottleneck: Without composition law, induced maps are isolated computations.
Why-now trigger: Diagram chasing in Chapter 5 assumes compositional consistency.
Rejected shortcut: Verify composition on one example only.
Stage objective: Show $(g\circ f)_*=g_*\circ f_*$ and identity law.
Payoff signal: Homology is a functor from simplicial complexes to graded abelian groups.

**Intuition**:
Mental model: Transport along two steps equals transport along composed route.
Where it fails: Inconsistent orientation conventions can mask true equality.

**Construction step**:
Uses: Primitive 4 and Stage 3 definition.
From $(g\circ f)_\#=g_\#\circ f_\#$, pass to classes:
$$
(g\circ f)_*([z])=[g_\#(f_\#z)]=g_*(f_*([z])).
$$

**Worked example**:
Example 1
Setup: Nested inclusions $A\hookrightarrow B\hookrightarrow C$.
Compute: $(i_{BC}\circ i_{AB})_*=i_{BC*}\circ i_{AB*}$.
Interpret: Inclusion-induced maps compose naturally.
Common mistake: Calculating each map with different basis labeling and comparing raw coordinates.

Example 2
Setup: Constant map $K\to \{pt\}$ after inclusion $A\hookrightarrow K$.
Compute: Composition induces zero map in positive degrees both ways.
Interpret: Functorial law holds even for degenerate maps.
Common mistake: Assuming nontrivial domain class must map nontrivially.

**What this unlocks next**:
Foundation for invariance under triangulation changes.
Remaining gap: Need explicit subdivision comparison argument.

### Stage 5: Establish triangulation invariance idea
**Motivation**:
Bottleneck: Computation appears triangulation-dependent because matrices change size.
Why-now trigger: Same space with refined mesh should not change invariant.
Rejected shortcut: Claim invariance from a few matching examples.
Stage objective: Use subdivision maps to produce homology isomorphisms.
Payoff signal: Refinement changes representation, not invariant content.

**Intuition**:
Mental model: Mesh resolution changes coordinates, not topology.
Where it fails: Needs chain-level maps and homotopy arguments, not only intuition.

**Construction step**:
Uses: Primitive 5 and Stage 4 functoriality.
Construct chain maps between $K$ and $\mathrm{Sd}(K)$ inducing inverse isomorphisms on homology (up to chain homotopy, meaning a controlled chain-level interpolation between map compositions and identity).

**Worked example**:
Example 1
Setup: Circle triangulation and barycentric subdivision.
Compute: Both yield $H_1\cong\mathbb{Z}$, connected by induced isomorphism.
Interpret: Additional vertices/edges do not create new hole classes.
Common mistake: Comparing matrix dimensions and concluding invariants differ.

Example 2
Setup: Filled triangle and its subdivision.
Compute: Both remain contractible with $H_1=0$.
Interpret: More simplices do not imply more topology.
Common mistake: Counting simplices instead of classes.

**What this unlocks next**:
Confidence that simplicial homology is topological, not mesh-specific.
Remaining gap: Need explicit bridge to singular homology framework.

### Stage 6: Bridge to singular homology
**Motivation**:
Bottleneck: Simplicial constructions appear limited to triangulated models.
Why-now trigger: Algebraic topology uses singular homology for broad generality.
Rejected shortcut: Assert equivalence without map-level construction.
Stage objective: State and interpret simplicial-singular correspondence for triangulable spaces.
Payoff signal: Computational simplicial results inherit general topological legitimacy.

**Intuition**:
Mental model: Simplicial chains are a compressed coordinate chart inside singular chains.
Where it fails: Compression metaphor hides theorem hypotheses and map constructions.

**Construction step**:
Uses: Primitive 6 and Stage 5 invariance.
For triangulable spaces, comparison maps induce isomorphisms
$$
H_n^{\mathrm{simp}}(K)\cong H_n^{\mathrm{sing}}(|K|).
$$

**Worked example**:
Example 1
Setup: Triangulated torus.
Compute: Simplicial computation gives $H_1\cong\mathbb{Z}^2$, matching singular homology theorem.
Interpret: Two frameworks agree on invariant classes.
Common mistake: Assuming chain groups are literally identical object-by-object.

Example 2
Setup: Triangulated sphere.
Compute: $H_2^{\mathrm{simp}}\cong\mathbb{Z}$ matches singular $H_2(S^2)$.
Interpret: Top-degree class agreement confirms bridge.
Common mistake: Ignoring necessity of triangulability assumptions.

**What this unlocks next**:
Entry into broader algebraic topology tools.
Remaining gap: Need integrated summary and continuation roadmap.

### Stage 7: Synthesize full course architecture
**Motivation**:
Bottleneck: Isolated chapter facts are hard to transfer to new problems.
Why-now trigger: We now have all layers from combinatorics to invariance.
Rejected shortcut: End with theorem list only.
Stage objective: Consolidate reusable design pattern across chapters.
Payoff signal: Learner can deploy framework on unseen complexes.

**Intuition**:
Mental model: Encode, boundary, quotient, compute, compare, transport.
Where it fails: Pipeline slogan must be backed by explicit map and proof checks in new settings.

**Construction step**:
Uses: Chapters 1-5 and Stages 1-6.
Compress core formulas:
$$
H_n=\ker\partial_n/\operatorname{im}\partial_{n+1},\qquad (g\circ f)_*=g_*\circ f_*.
$$
Pair this with long exact sequence tools from Chapter 5.

**Worked example**:
Example 1
Setup: New triangulated dataset with subcomplex of interest.
Compute: Run Chapter 4 matrix pipeline, then Chapter 5 exact-sequence comparison, then map transport checks from this chapter.
Interpret: End-to-end method yields invariant and relational conclusions.
Common mistake: Stopping after Betti numbers and ignoring induced maps.

Example 2
Setup: Same space under refinement.
Compute: Recompute on subdivision and match classes via induced isomorphism.
Interpret: Numerical representation changes but invariant classes persist.
Common mistake: Treating refined and coarse triangulations as unrelated problems.

**What this unlocks next**:
Ready path to cohomology, Mayer-Vietoris, and computational topology.
Remaining gap: Advanced machinery like spectral sequences remains beyond current scope.

## 4. Final Concept/Theorem Statement

Formal statement: A simplicial map $f:K\to L$ induces chain maps $f_\#:C_n(K)\to C_n(L)$ with $\partial f_\#=f_\#\partial$, hence induced homology maps $f_*:H_n(K)\to H_n(L)$. These satisfy functorial laws
$$
(g\circ f)_*=g_*\circ f_*,\qquad (\mathrm{id}_K)_*=\mathrm{id}_{H_n(K)}.
$$
With subdivision comparison maps, simplicial homology is invariant under triangulation changes on triangulable spaces and agrees with singular homology there.

Near-miss/non-example: Two triangulations of one space generally do not give identical boundary matrices, so literal matrix equality is not the invariance criterion.

Wrong mental model: Homology outputs are static numbers detached from maps.

Correction: Homology is functorial data: groups plus induced morphisms that preserve composition and exact-sequence structure.

Scope boundary: This chapter establishes course-level functoriality and invariance perspective, but does not provide full proofs of singular theory foundations or advanced derived tools.

## 5. How the Thinking Process Could Have Invented It

After building computation and exact sequences, the unresolved issue was robustness under map composition and triangulation change. The solution was to elevate every geometric map to chain maps, enforce boundary compatibility, and then pass to homology where functorial laws become unavoidable.

Failed attempt 1: Treat homology only as per-space numbers. This fails because comparison theorems and exact-sequence naturality depend on induced maps.

Failed attempt 2: Claim invariance from a handful of matching examples. This fails because empirical matches do not establish map-level isomorphism in general.

Design rule: Before claiming an invariant is topological, prove map-induced functorial behavior and triangulation-independence through explicit comparison maps.

Post-course continuation: Beyond this course, continue with Mayer-Vietoris, simplicial cohomology, persistent homology, and eventually spectral sequences for multiscale or filtered settings.
