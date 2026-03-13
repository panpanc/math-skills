# Chapter 3: Why $\partial^2=0$ Forces Homology

## Learning objectives
- Define cycles $Z_n$ and boundaries $B_n$ from chain maps.
- Prove $B_n\subseteq Z_n$ and justify the quotient.
- Compute first homology groups on canonical examples.

## Prerequisite chapters
- Chapter 1
- Chapter 2

## Chapter target concept/theorem
Definition of simplicial homology groups $H_n(K)=Z_n(K)/B_n(K)$ and theorem $\operatorname{im}\partial_{n+1}\subseteq\ker\partial_n$.

## 1. Destination and Why It Matters

Chapter 2 built the machine $\partial_n$. This chapter extracts meaning from that machine. We need to separate closed chains that are merely boundaries from closed chains that represent genuine obstructions.

The destination is the quotient $H_n=Z_n/B_n$. This is the first true invariant of the course.

Callback: Chapter 2 gave maps and cancellation; now we transform that structure into equivalence classes.

## 2. Foundation Layer

### Primitive 1: Kernel as algebraic closure
- What it is: $\ker\partial_n=\{c\in C_n: \partial_n c=0\}$.
- Why it is load-bearing: Cycles are defined exactly this way.
- Tiny numeric example: If $\partial_1(e_{01}+e_{12}+e_{20})=0$, the chain is a 1-cycle.
- Failure mode: Eyeballing closedness can miss sign mistakes.

### Primitive 2: Image as generated boundaries
- What it is: $\operatorname{im}\partial_{n+1}=\{\partial_{n+1}c : c\in C_{n+1}\}$.
- Why it is load-bearing: These are the chains that should be treated as trivial cycles.
- Tiny numeric example: $\partial_2[v_0,v_1,v_2]=e_{12}-e_{02}+e_{01}$.
- Failure mode: Assuming every cycle appears in the image.

### Primitive 3: Subgroup inclusion requirement
- What it is: Quotient $Z_n/B_n$ needs $B_n\subseteq Z_n$.
- Why it is load-bearing: Without inclusion, the quotient is undefined.
- Tiny numeric example: $\partial_n\partial_{n+1}=0$ implies $\partial_n(\partial_{n+1}c)=0$.
- Failure mode: Writing quotient notation before proving inclusion.

### Primitive 4: Cosets and equivalence classes
- What it is: $z\sim z'$ if $z-z'\in B_n$.
- Why it is load-bearing: Homology classes are cosets, not single chains.
- Tiny numeric example: If $z'=z+\partial_{n+1}c$, then $[z]=[z']$.
- Failure mode: Treating quotient like arithmetic division.

### Primitive 5: Generators and relations
- What it is: Homology can be read as cycle generators modulo boundary relations.
- Why it is load-bearing: This explains rank and later torsion behavior.
- Tiny numeric example: Circle triangulation gives one generator with no 2-boundary relation, so $H_1\cong\mathbb{Z}$.
- Failure mode: Counting generators without checking relations.

### Primitive 6: Geometric interpretation of low degrees
- What it is: $H_0$ corresponds to connected components; $H_1$ tracks independent 1-holes in basic examples.
- Why it is load-bearing: Connects algebraic definition back to geometry.
- Tiny numeric example: Two disconnected intervals give $H_0\cong\mathbb{Z}^2$.
- Failure mode: Interpreting $H_0$ as number of vertices.

## 3. Bottom-Up Thinking Stages

### Stage 1: Define cycles via kernel
**Motivation**:
Bottleneck: "Closed loop" intuition is not precise for weighted chains.
Why-now trigger: We need a formal criterion that scales beyond drawings.
Rejected shortcut: Decide closedness by visual inspection.
Stage objective: Define $Z_n(K)=\ker\partial_n$.
Payoff signal: A cycle test is now an equation.

**Intuition**:
Mental model: A cycle has zero net boundary flux.
Where it fails: Zero flux does not imply nontrivial hole.

**Construction step**:
Uses: Primitive 1 and Chapter 2 boundary maps.
Set $$Z_n(K)=\{c\in C_n(K):\partial_n c=0\}.$$ 

**Worked example**:
Example 1
Setup: Hollow triangle perimeter $p=e_{01}+e_{12}+e_{20}$.
Compute: $\partial_1p=(v_1-v_0)+(v_2-v_1)+(v_0-v_2)=0$.
Interpret: $p\in Z_1$.
Common mistake: Dropping one endpoint term.

Example 2
Setup: Single edge $e_{01}$.
Compute: $\partial_1e_{01}=v_1-v_0\neq0$.
Interpret: Not every chain is closed.
Common mistake: Calling any connected chain a cycle.

**What this unlocks next**:
Candidate objects for hole classes.
Remaining gap: Need to mark boundary-generated cycles as trivial.

### Stage 2: Define boundaries via image
**Motivation**:
Bottleneck: Cycle space includes both genuine and fillable loops.
Why-now trigger: Filled and hollow triangle share same perimeter chain shape.
Rejected shortcut: Mark "small" loops trivial by geometric size.
Stage objective: Define $B_n(K)=\operatorname{im}\partial_{n+1}$.
Payoff signal: Triviality depends on actual fillers, not visual heuristics.

**Intuition**:
Mental model: Boundaries are shadows of one-dimension-higher chains.
Where it fails: A chain can be closed without being a shadow if no higher simplices exist.

**Construction step**:
Uses: Primitive 2 and Chapter 2 formula.
Set $$B_n(K)=\{\partial_{n+1}c: c\in C_{n+1}(K)\}.$$ 

**Worked example**:
Example 1
Setup: Filled triangle with 2-simplex $t$.
Compute: $\partial_2t=e_{12}-e_{02}+e_{01}$.
Interpret: Perimeter-type cycle is boundary-generated.
Common mistake: Assuming this remains true in every complex.

Example 2
Setup: Hollow triangle with $C_2=0$.
Compute: $B_1=\operatorname{im}\partial_2=0$.
Interpret: No 1-boundaries exist there.
Common mistake: Borrowing boundaries from a different ambient complex.

**What this unlocks next**:
Need subgroup inclusion to justify quotient.
Remaining gap: Must prove $B_n\subseteq Z_n$.

### Stage 3: Prove $B_n\subseteq Z_n$
**Motivation**:
Bottleneck: Quotient notation is invalid without subgroup inclusion.
Why-now trigger: Homology definition needs legal denominator.
Rejected shortcut: Assume inclusion because "boundary of boundary should be zero" without proof.
Stage objective: Derive inclusion from $\partial_n\partial_{n+1}=0$.
Payoff signal: Every boundary is automatically a cycle.

**Intuition**:
Mental model: A boundary cannot itself have boundary.
Where it fails: Sign errors can create fake nonzero second boundaries.

**Construction step**:
Uses: Primitive 3 and Chapter 2 Stage 5.
If $b\in B_n$, then $b=\partial_{n+1}c$ for some $c$, so
$$
\partial_n b=\partial_n\partial_{n+1}c=0,
$$
thus $b\in Z_n$ and $B_n\subseteq Z_n$.

**Worked example**:
Example 1
Setup: $b=\partial_2[v_0,v_1,v_2]$.
Compute: $\partial_1b=\partial_1\partial_2[v_0,v_1,v_2]=0$.
Interpret: Concrete boundary is a cycle.
Common mistake: Proving only one example and treating it as full proof.

Example 2
Setup: General chain $c=\sum_i a_i\sigma_i$.
Compute: $\partial_n\partial_{n+1}c=\sum_i a_i\partial_n\partial_{n+1}\sigma_i=0$.
Interpret: Linearity extends simplex-level identity.
Common mistake: Forgetting linear extension argument.

**What this unlocks next**:
Quotient $Z_n/B_n$ is now legal.
Remaining gap: Need class-level definition and interpretation.

### Stage 4: Define homology as quotient
**Motivation**:
Bottleneck: Cycles still overcount fillable features.
Why-now trigger: Distinct cycles differing by a boundary should represent same feature.
Rejected shortcut: Choose one preferred representative cycle by hand.
Stage objective: Identify cycles modulo boundaries.
Payoff signal: Each class captures a robust obstruction, not a specific chain.

**Intuition**:
Mental model: A class is an orbit under adding boundaries.
Where it fails: Orbit picture can hide the actual group law on cosets.

**Construction step**:
Uses: Primitive 4 and Stage 3.
Define
$$
H_n(K)=Z_n(K)/B_n(K).
$$
Equivalently, $z\sim z'$ when $z-z'\in B_n(K)$.

**Worked example**:
Example 1
Setup: Filled triangle perimeter $p$.
Compute: $p\in B_1$, so $[p]=[0]$ in $H_1$.
Interpret: Loop is homologically trivial.
Common mistake: Mistaking nonzero chain for nonzero class.

Example 2
Setup: Hollow triangle perimeter $p$.
Compute: $B_1=0$ and $p\neq0$, so $[p]\neq[0]$.
Interpret: Nontrivial 1-class survives.
Common mistake: Comparing classes without naming ambient complex.

**What this unlocks next**:
Computable invariants from kernels and images.
Remaining gap: Need systematic computation workflows.

### Stage 5: Compute low-degree groups in canonical examples
**Motivation**:
Bottleneck: Definition remains abstract without explicit calculations.
Why-now trigger: We need stable interpretation checks for $H_0$ and $H_1$.
Rejected shortcut: Trust geometric intuition alone.
Stage objective: Compute $H_0$ and $H_1$ for interval, hollow triangle, filled triangle.
Payoff signal: Algebraic outputs match geometric expectations.

**Intuition**:
Mental model: $H_0$ counts connected components, $H_1$ counts independent loops in basic settings.
Where it fails: Rank slogans alone do not capture torsion in advanced spaces.

**Construction step**:
Uses: Stage 4 quotient and Chapter 2 matrices.
Compute $Z_n=\ker\partial_n$ and $B_n=\operatorname{im}\partial_{n+1}$, then quotient.

**Worked example**:
Example 1
Setup: Interval with one edge.
Compute: $H_0\cong\mathbb{Z}$ and $H_1=0$.
Interpret: One connected component, no 1-hole.
Common mistake: Claiming $H_0\cong\mathbb{Z}^2$ from two vertices.

Example 2
Setup: Hollow triangle.
Compute: $\ker\partial_1\cong\mathbb{Z}$ and $\operatorname{im}\partial_2=0$, so $H_1\cong\mathbb{Z}$.
Interpret: One independent 1-dimensional hole.
Common mistake: Thinking three edges imply three independent holes.

**What this unlocks next**:
Confidence in the invariant's meaning.
Remaining gap: Need scalable matrix pipeline for larger complexes.

### Stage 6: Reinterpret homology via generators and relations
**Motivation**:
Bottleneck: Raw quotient notation hides structural intuition.
Why-now trigger: We need to explain why some cycles survive and others collapse.
Rejected shortcut: Report only Betti numbers.
Stage objective: View $H_n$ as generators modulo boundary relations.
Payoff signal: Class arithmetic becomes transparent.

**Intuition**:
Mental model: Independent cycles are generators; fillings impose relations.
Where it fails: In complex examples, generator sets are large and need algorithmic reduction.

**Construction step**:
Uses: Primitive 5 and Stage 4.
Write symbolic presentations where cycle generators are quotiented by relations from $\partial_{n+1}$.

**Worked example**:
Example 1
Setup: Figure-eight graph triangulation with loops $\alpha,\beta$ and no 2-simplices.
Compute: No boundary relations in degree $1$, so $H_1\cong\mathbb{Z}^2$.
Interpret: Two independent loop classes survive.
Common mistake: Merging loops because they share a basepoint.

Example 2
Setup: Filled triangle.
Compute: Perimeter generator is identified with $0$ by one boundary relation.
Interpret: Relation removes the candidate class.
Common mistake: Keeping generator count without applying relation.

**What this unlocks next**:
A conceptually clean path to matrix reduction.
Remaining gap: Need deterministic computational workflow and checks.

### Stage 7: Frame next computational and relational steps
**Motivation**:
Bottleneck: Current examples are small; practical use needs scalable computation.
Why-now trigger: Real complexes have many simplices and subcomplex interactions.
Rejected shortcut: Continue by geometric inspection only.
Stage objective: Prepare transition to algorithmic homology and relative structures.
Payoff signal: Clear reason for Chapter 4 and Chapter 5.

**Intuition**:
Mental model: Chapter 3 gives the invariant law; Chapter 4 gives the calculator.
Where it fails: Calculator alone cannot compare $(K,A)$ pairs without exact-sequence tools.

**Construction step**:
Uses: Stage 5 computations and Chapter 2 matrix representation.
Recast formula
$$
H_n(K)=\ker\partial_n/\operatorname{im}\partial_{n+1}
$$
as a kernel-image quotient on integer matrices for finite complexes.

**Worked example**:
Example 1
Setup: Complex with $12$ edges and $8$ triangles.
Compute: Build $\partial_2\in\mathbb{Z}^{12\times 8}$ and $\partial_1\in\mathbb{Z}^{v\times 12}$, then quotient kernel by image.
Interpret: Procedure scales with data, not drawing complexity.
Common mistake: Estimating $H_1$ by counting visible loops only.

Example 2
Setup: Pair $(K,A)$ with $A\subseteq K$.
Compute: Absolute groups alone cannot track which classes disappear in $A$.
Interpret: Relative homology is the next structural necessity.
Common mistake: Subtracting absolute ranks to guess relative groups.

**What this unlocks next**:
Algorithmic computation and pair-level theory.
Remaining gap: Exact computational pipeline is still to be built.

## 4. Final Concept/Theorem Statement

Formal definition: For each $n$,
$$
Z_n(K)=\ker\partial_n,\qquad B_n(K)=\operatorname{im}\partial_{n+1},
$$
and because $\partial_n\partial_{n+1}=0$, we have $B_n(K)\subseteq Z_n(K)$. The simplicial homology group is
$$
H_n(K)=Z_n(K)/B_n(K).
$$

Near-miss/non-example: Using $Z_n$ alone as the invariant overcounts boundaries. Example: the perimeter of a filled triangle lies in $Z_1$ but must be trivial in homology.

Wrong mental model: A homology class is one specific loop drawn around a hole.

Correction: A homology class is an equivalence class of cycles modulo boundaries; many geometric loops can represent the same class.

Scope boundary: This chapter defines homology and low-degree interpretation, but does not yet provide full-scale matrix algorithms, relative exact sequences, or invariance proofs.

## 5. How the Thinking Process Could Have Invented It

The key pressure was a contradiction: closed chains looked like hole candidates, but some were clearly boundaries of filled regions. The natural response was to split "closed" from "fillable" and then identify cycles differing by fillable parts.

Failed attempt 1: Define holes as all cycles. This fails because boundaries are cycles too, creating systematic false positives.

Failed attempt 2: Mark trivial cycles by informal geometric judgment. This fails because judgments change across triangulations and are not algebraically stable.

Design rule: When a candidate feature set mixes true structure and generated artifacts, quotient by the artifact-generating subgroup.

Bridge to next chapter: In Chapter 4 we implement this quotient deterministically using boundary matrices, kernel/image computation, and sanity checks.
